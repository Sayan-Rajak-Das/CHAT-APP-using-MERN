import { useEffect, useState } from "react";
import useChatStore from "../store/useChatStore";
import useAuthStore from "../store/useAuthStore";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import { Users, ArrowLeft, Search } from "lucide-react";

const Sidebar = () => {
    const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } = useChatStore();
    const { onlineUsers } = useAuthStore();

    const [showOnlineOnly, setShowOnlineOnly] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredUsers, setFilteredUsers] = useState([]);

    useEffect(() => {
        getUsers();
    }, [getUsers]);

    useEffect(() => {
        // Filter users based on the search query and online status
        let filtered = users;

        if (searchQuery.trim()) {
            filtered = filtered.filter((user) =>
                user.fullName.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        if (showOnlineOnly) {
            filtered = filtered.filter((user) => onlineUsers.includes(user._id));
        }

        setFilteredUsers(filtered);
    }, [users, searchQuery, showOnlineOnly, onlineUsers]);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const resetSearch = () => {
        setSearchQuery("");
    };

    if (isUsersLoading) return <SidebarSkeleton />;

    return (
        <aside className="h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200">
            {/* Header Section */}
            <div className="border-b border-base-300 w-full p-3">
                <div className="flex items-center gap-2">
                    <Users className="size-6" />
                    <span className="font-medium hidden lg:block">Contacts</span>
                </div>

                {/* Search Bar */}
                <div
                    className={`mt-2 relative flex items-center rounded-md transition-all ${
                        searchQuery.trim()
                            ? "border-2 border-gray-400 shadow-sm"
                            : "border border-gray-300"
                    }`}
                >
                    {/* Show Search Icon only when the input is empty */}
                    {!searchQuery.trim() && (
                        <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500 size-4" />
                    )}
                    {/* Show Arrow Icon only when there is text */}
                    {searchQuery.trim() && (
                        <button
                            onClick={resetSearch}
                            className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500"
                        >
                            <ArrowLeft className="size-4" />
                        </button>
                    )}
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        placeholder="Search..."
                        className="input input-sm w-full pl-10 py-1.5 text-sm focus:outline-none border-none"
                    />
                </div>

                {/* Online filter toggle */}
                <div className="mt-2 hidden lg:flex items-center gap-2">
                    <label className="cursor-pointer flex items-center gap-2">
                        <input
                            type="checkbox"
                            checked={showOnlineOnly}
                            onChange={(e) => setShowOnlineOnly(e.target.checked)}
                            className="checkbox checkbox-sm"
                        />
                        <span className="text-sm">Show online only</span>
                    </label>
                    <span className="text-xs text-zinc-500">({onlineUsers.length - 1} online)</span>
                </div>
            </div>

            {/* User List Section */}
            <div className="overflow-y-auto w-full py-2">
                {filteredUsers.map((user) => (
                    <button
                        key={user._id}
                        onClick={() => setSelectedUser(user)}
                        className={`w-full p-2 flex items-center gap-3 hover:bg-base-300 transition-colors ${
                            selectedUser?._id === user._id ? "bg-base-300 ring-1 ring-base-300" : ""
                        }`}
                    >
                        <div className="relative mx-auto lg:mx-0">
                            <img
                                src={user.profilePic || "/avatar.png"}
                                alt={user.name}
                                className="size-12 object-cover rounded-full"
                            />
                            {onlineUsers.includes(user._id) && (
                                <span
                                    className="absolute bottom-0 right-0 size-3 bg-green-500 
                                    rounded-full ring-2 ring-zinc-900"
                                />
                            )}
                        </div>

                        {/* User info - only visible on larger screens */}
                        <div className="hidden lg:block text-left min-w-0">
                            <div className="font-medium truncate">{user.fullName}</div>
                            <div className="text-sm text-zinc-400">
                                {onlineUsers.includes(user._id) ? "Online" : "Offline"}
                            </div>
                        </div>
                    </button>
                ))}

                {filteredUsers.length === 0 && (
                    <div className="text-center text-zinc-500 py-4">No users found</div>
                )}
            </div>
        </aside>
    );
};

export default Sidebar;
