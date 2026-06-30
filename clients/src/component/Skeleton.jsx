// Reusable skeleton shimmer base
const Shimmer = ({ className = '' }) => (
    <div className={`animate-pulse bg-gray-200 rounded-lg ${className}`} />
);

// Skeleton for a single event card (used in Home page)
export const EventCardSkeleton = () => (
    <div className="bg-white rounded-xl overflow-hidden shadow-md flex flex-col">
        <Shimmer className="h-48 w-full rounded-none" />
        <div className="p-6 flex flex-col gap-3">
            <Shimmer className="h-3 w-16" />
            <Shimmer className="h-5 w-3/4" />
            <Shimmer className="h-3 w-1/2" />
            <Shimmer className="h-3 w-2/5" />
            <Shimmer className="h-2 w-full mt-2 rounded-full" />
            <Shimmer className="h-9 w-full mt-1 rounded-lg" />
        </div>
    </div>
);

// Skeleton for Home page grid
export const HomePageSkeleton = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Array.from({ length: 6 }).map((_, i) => (
            <EventCardSkeleton key={i} />
        ))}
    </div>
);

// Skeleton for EventDetail page
export const EventDetailSkeleton = () => (
    <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden mt-8 animate-pulse">
        <div className="h-80 w-full bg-gray-200" />
        <div className="p-8 md:p-12">
            <div className="flex flex-col md:flex-row justify-between gap-6">
                <div className="flex-1 flex flex-col gap-4">
                    <Shimmer className="h-5 w-24" />
                    <Shimmer className="h-9 w-3/4" />
                    <Shimmer className="h-4 w-full" />
                    <Shimmer className="h-4 w-5/6" />
                    <Shimmer className="h-4 w-2/3" />
                </div>
                <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 min-w-[300px] w-full md:w-auto shrink-0 flex flex-col gap-5">
                    <Shimmer className="h-6 w-40" />
                    {Array.from({ length: 4 }).map((_, i) => (
                        <div key={i} className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-gray-200" />
                            <div className="flex flex-col gap-2 flex-1">
                                <Shimmer className="h-3 w-20" />
                                <Shimmer className="h-4 w-28" />
                            </div>
                        </div>
                    ))}
                    <Shimmer className="h-14 w-full rounded-xl mt-2" />
                </div>
            </div>
        </div>
    </div>
);

// Skeleton for a single booking card (used in UserDashboard)
export const BookingCardSkeleton = () => (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 flex flex-col animate-pulse">
        <div className="p-6 flex flex-col gap-3 flex-grow">
            <div className="flex justify-between items-start">
                <Shimmer className="h-5 w-2/3" />
                <Shimmer className="h-5 w-16 rounded-full" />
            </div>
            <Shimmer className="h-3 w-1/2" />
            <Shimmer className="h-3 w-2/5" />
            <Shimmer className="h-3 w-1/3" />
        </div>
        <div className="p-4 bg-gray-50 flex justify-between">
            <Shimmer className="h-4 w-20" />
            <Shimmer className="h-4 w-16" />
        </div>
    </div>
);

// Skeleton for UserDashboard bookings grid
export const UserDashboardSkeleton = () => (
    <div className="max-w-6xl mx-auto animate-pulse">
        {/* Profile header skeleton */}
        <div className="bg-white rounded-2xl shadow-sm p-6 sm:p-8 mb-8 border border-gray-100 flex items-center gap-6">
            <div className="w-20 h-20 rounded-full bg-gray-200 shrink-0" />
            <div className="flex flex-col gap-3">
                <Shimmer className="h-7 w-48" />
                <Shimmer className="h-4 w-32" />
            </div>
        </div>
        <Shimmer className="h-7 w-40 mb-6" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
                <BookingCardSkeleton key={i} />
            ))}
        </div>
    </div>
);

// Skeleton for a single event row in AdminDashboard events list
export const AdminEventRowSkeleton = () => (
    <li className="p-5 flex justify-between items-center gap-4 animate-pulse">
        <div className="flex flex-col gap-2 flex-1">
            <Shimmer className="h-4 w-48" />
            <Shimmer className="h-3 w-32" />
        </div>
        <Shimmer className="h-9 w-20 rounded-lg" />
    </li>
);

// Skeleton for a single booking row in AdminDashboard
export const AdminBookingRowSkeleton = () => (
    <li className="p-6 flex flex-col gap-3 border-l-4 border-gray-200 animate-pulse">
        <div className="flex justify-between items-start">
            <Shimmer className="h-5 w-2/3" />
            <Shimmer className="h-5 w-16 rounded-full" />
        </div>
        <div className="bg-gray-50 rounded-lg p-3 border border-gray-100 flex flex-col gap-2">
            <Shimmer className="h-3 w-3/4" />
            <Shimmer className="h-3 w-1/2" />
            <Shimmer className="h-3 w-2/5" />
        </div>
        <div className="flex gap-2">
            <Shimmer className="h-9 flex-1 rounded-lg" />
            <Shimmer className="h-9 flex-1 rounded-lg" />
            <Shimmer className="h-9 w-20 rounded-lg" />
        </div>
    </li>
);

// Full AdminDashboard skeleton
export const AdminDashboardSkeleton = () => (
    <div className="max-w-7xl mx-auto animate-pulse">
        {/* Header */}
        <div className="bg-gray-900 rounded-2xl p-6 sm:p-8 mb-8 flex justify-between items-center">
            <div className="flex flex-col gap-3">
                <Shimmer className="h-8 w-52 bg-gray-700" />
                <Shimmer className="h-4 w-64 bg-gray-700" />
            </div>
            <Shimmer className="h-12 w-40 bg-gray-700 rounded-lg" />
        </div>
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
                    <div className="flex flex-col gap-2">
                        <Shimmer className="h-3 w-24" />
                        <Shimmer className="h-8 w-16" />
                    </div>
                    <div className="w-12 h-12 rounded-full bg-gray-200" />
                </div>
            ))}
        </div>
        {/* Lists */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <ul className="divide-y divide-gray-100">
                    {Array.from({ length: 4 }).map((_, i) => <AdminEventRowSkeleton key={i} />)}
                </ul>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <ul className="divide-y divide-gray-100">
                    {Array.from({ length: 3 }).map((_, i) => <AdminBookingRowSkeleton key={i} />)}
                </ul>
            </div>
        </div>
    </div>
);

export default Shimmer;
