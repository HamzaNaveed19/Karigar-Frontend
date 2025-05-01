const BookingDetailItem = ({ icon, value }) => {
  return (
    <div className="flex items-center gap-3">
      <div className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
        {icon}
      </div>
      <p className="text-gray-900 text-sm">{value}</p>
    </div>
  );
};

export default BookingDetailItem;
