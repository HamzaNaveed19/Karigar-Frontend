import * as LucideIcons from "lucide-react";

export default function CategoryCard({ icon, title, description, color }) {
  const IconComponent = LucideIcons[icon];

  return (
    // <Link href={`/services/${title.toLowerCase()}`}>

    <div
      className={`flex flex-col items-center rounded-lg p-4 text-center transition-all hover:shadow-md ${color}`}
    >
      <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-white">
        {IconComponent && (
          <IconComponent className="h-6 w-6 text-emerald-600" />
        )}
      </div>
      <h3 className="mb-1 font-medium">{title}</h3>
      <p className="text-xs text-gray-500">{description}</p>
    </div>

    // </Link>
  );
}
