/**
 * Componente SkeletonLoader
 * 
 * Muestra un skeleton/placeholder mientras se cargan datos.
 * Mejora la percepción de velocidad de carga en la UI.
 */

interface SkeletonRowProps {
    columns: number
    rows: number
}

export function SkeletonTableRows({ columns, rows }: SkeletonRowProps) {
    return (
        <>
            {Array.from({ length: rows }).map((_, rowIdx) => (
                <tr key={rowIdx} className="border-b">
                    {Array.from({ length: columns }).map((_, colIdx) => (
                        <td key={colIdx} className="px-4 py-3">
                            <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                        </td>
                    ))}
                </tr>
            ))}
        </>
    )
}

export function SkeletonCard() {
    return (
        <div className="border border-gray-200 rounded-lg p-6 space-y-4 animate-pulse">
            <div className="h-6 bg-gray-200 rounded w-2/3"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            </div>
        </div>
    )
}
