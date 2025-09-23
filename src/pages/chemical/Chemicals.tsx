import React, { useState } from 'react'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { Input } from '@/components/ui/input'
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationPrevious, PaginationNext, PaginationEllipsis } from '@/components/ui/pagination'
import { Search } from 'lucide-react'
import chemicals from '@/data/chemicals.json'
import { Link } from 'react-router'

const ITEMS_PER_PAGE = 10

const Chemicals = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [searchQuery, setSearchQuery] = useState('')

    // Filter data based on search query
    const filteredData = chemicals.filter(item =>
        item.ChemicalName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.CASNumber + '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.CatalogueNumber || '').toLowerCase().includes(searchQuery.toLowerCase())
    )

    const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE)

    const paginatedData = filteredData.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    )

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page)
        }
    }

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value)
        setCurrentPage(1)
    }

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setCurrentPage(1)
    }

    const getPageNumbers = () => {
        const pages = []
        let start = Math.max(1, currentPage - 2)
        let end = Math.min(totalPages, currentPage + 2)

        if (currentPage <= 3) {
            end = Math.min(5, totalPages)
        } else if (currentPage >= totalPages - 2) {
            start = Math.max(1, totalPages - 4)
        }

        for (let i = start; i <= end; i++) {
            pages.push(i)
        }
        return pages
    }

    // Helper to get available units as array
    const getUnitsList = (item: any) => {
        const units: string[] = []
        if (item["500GM Price"] && item["500GM Price"] !== "" && item["500GM Price"] !== "-") units.push("500GM")
        if (item["100GM Price"] && item["100GM Price"] !== "" && item["100GM Price"] !== "-") units.push("100GM")
        return units
    }

    // Helper to get available prices as array
    const getPricesList = (item: any) => {
        const prices: string[] = []
        if (item["500GM Price"] && item["500GM Price"] !== "" && item["500GM Price"] !== "-") prices.push(`₹${item["500GM Price"]}`)
        if (item["100GM Price"] && item["100GM Price"] !== "" && item["100GM Price"] !== "-") prices.push(`₹${item["100GM Price"]}`)
        return prices
    }

    return (
        <main>
            <Breadcrumb className='max-w-6xl mx-auto px-6 md:px-3 lg:px-0 py-8'>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/">Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Chemicals</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <section className='max-w-6xl mx-auto px-6 md:px-3 lg:px-0 py-8 lg:py-16'>
                <span className='text-center font-extrabold text-2xl flex gap-2 items-center justify-center uppercase'>
                    <h2 className='text-center  text-2xl'>Chemicals</h2>
                    <h2 className='bg-primary text-white p-2 rounded-'>List</h2>
                </span>

                <div className='mt-6'>
                    <div className='flex justify-center md:justify-end  mb-5'>
                        <form className='relative flex items-center gap-2' onSubmit={handleSearchSubmit}>
                            <Input
                                type="text"
                                onChange={handleSearchChange}
                                value={searchQuery}
                                placeholder="Search by Catalogue No, Name, or CAS Number"
                                className="w-78 focus:ring-primary hover:border-primary pl-9"
                            />
                            <span className='absolute left-2'><Search color='gray' size={20} /></span>
                        </form>
                    </div>
                    <div className="overflow-x-auto bg-white rounded-lg shadow hidden md:block">
                        <table className="min-w-full text-sm text-left border border-gray-200">
                            <thead className="bg-gray-100 text-gray-700 font-semibold">
                                <tr>
                                    <th className="px-4 py-3">ID</th>
                                    <th className="px-4 py-3">Chemical Name</th>
                                    <th className="px-4 py-3">Purity</th>
                                    <th className="px-4 py-3">CAS Number</th>
                                    <th className="px-4 py-3">Units</th>
                                    <th className="px-4 py-3">Price</th>
                                    <th className="px-4 py-3">COA</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {paginatedData.map((item, index) => (
                                    <tr key={index} className="hover:bg-gray-50">
                                        <td className="px-4 py-3">{item.Id}</td>
                                        <td className="px-4 py-3 text-blue-700 cursor-pointer hover:underline">
                                            <Link to={`/chemicals/${item.CatalogueNumber}`}>{item.ChemicalName}</Link>
                                        </td>
                                        <td className="px-4 py-3">{item.Purity ? `${item.Purity * 100}%` : '-'}</td>
                                        <td className="px-4 py-3">{item.CASNumber}</td>
                                        <td className="px-4 py-3">
                                            {getUnitsList(item).length > 0 ? (
                                                <ul className="space-y-1 ">
                                                    {getUnitsList(item).map((unit, idx) => (
                                                        <li key={idx}>{unit}</li>
                                                    ))}
                                                </ul>
                                            ) : "-"
                                            }
                                        </td>
                                        <td className="px-4 py-3">
                                            {getPricesList(item).length > 0 ? (
                                                <ul className="space-y-1">
                                                    {getPricesList(item).map((price, idx) => (
                                                        <li key={idx}>{price}</li>
                                                    ))}
                                                </ul>
                                            ) : "-"
                                            }
                                        </td>
                                        <td className="px-4 py-3">
                                            <Link to={`/pdfs/coa/${item.CatalogueNumber}.pdf`} target='_blank' className="text-primary underline">Click to view</Link>
                                        </td>
                                    </tr>
                                ))}
                                {paginatedData.length === 0 && (
                                    <tr>
                                        <td colSpan={7} className="text-center py-6 font-bold text-neutral-500">No results found.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    {/* ✅ Mobile Card View */}
                    <div className="block md:hidden space-y-3">
                        {paginatedData.length === 0 ? (
                            <div className="text-center py-6 font-bold text-neutral-500">No results found.</div>
                        ) : (
                            paginatedData.map((item, index) => (
                                <div key={index} className="border-b border-gray-200 py-2 space-y-3 bg-white">
                                    <table>
                                        <tbody className='text-sm space-y-5'>
                                            <tr>
                                                <td className="font-bold whitespace-nowrap p-2">ID :</td>
                                                <td className='p-2'>{item.Id}</td>
                                            </tr>
                                            <tr className='bg-zinc-100'>
                                                <td className="font-bold whitespace-nowrap p-2">Chemical Name :</td>
                                                <td className="p-2 w-full text-blue-700 cursor-pointer hover:underline">
                                                    <Link to={`/chemicals/${item.CatalogueNumber}`}>{item.ChemicalName}</Link>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="font-bold whitespace-nowrap p-2">Purity :</td>
                                                <td className='p-2'>{item.Purity ? `${item.Purity * 100}%` : '-'}</td>
                                            </tr>
                                            <tr>
                                                <td className="font-bold whitespace-nowrap p-2">CAS Number :</td>
                                                <td className='p-2'>{item.CASNumber}</td>
                                            </tr>
                                            <tr>
                                                <td className="font-bold whitespace-nowrap p-2">Units :</td>
                                                <td className='p-2'>
                                                    {getUnitsList(item).length > 0 ? (
                                                        <ul className="">
                                                            {getUnitsList(item).map((unit, idx) => (
                                                                <li key={idx}>{unit}</li>
                                                            ))}
                                                        </ul>
                                                    ) : "-"
                                                    }
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="font-bold whitespace-nowrap p-2">Price :</td>
                                                <td className='p-2'>
                                                    {getPricesList(item).length > 0 ? (
                                                        <ul className="">
                                                            {getPricesList(item).map((price, idx) => (
                                                                <li key={idx}>{price}</li>
                                                            ))}
                                                        </ul>
                                                    ) : "-"
                                                    }
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="font-bold whitespace-nowrap p-2">COA :</td>
                                                <td className='p-2'>
                                                    <Link to={`/pdfs/coa/${item.CatalogueNumber}.pdf`} target='_blank' className="text-primary underline">Click to view</Link>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Pagination */}
                    <div className='flex justify-center mt-5'>
                        <Pagination>
                            <PaginationContent>
                                <PaginationItem>
                                    <PaginationPrevious
                                        href="#"
                                        onClick={e => { e.preventDefault(); handlePageChange(currentPage - 1); }}
                                        aria-disabled={currentPage === 1}
                                    />
                                </PaginationItem>
                                {/* First page and leading ellipsis */}
                                {getPageNumbers()[0] > 1 && (
                                    <>
                                        <PaginationItem>
                                            <PaginationLink
                                                href="#"
                                                isActive={currentPage === 1}
                                                onClick={e => { e.preventDefault(); handlePageChange(1); }}
                                            >1</PaginationLink>
                                        </PaginationItem>
                                        {getPageNumbers()[0] > 2 && (
                                            <PaginationItem>
                                                <PaginationEllipsis />
                                            </PaginationItem>
                                        )}
                                    </>
                                )}
                                {/* Main page numbers */}
                                {getPageNumbers().map(page => (
                                    <PaginationItem key={page}>
                                        <PaginationLink
                                            href="#"
                                            isActive={currentPage === page}
                                            onClick={e => { e.preventDefault(); handlePageChange(page); }}
                                        >
                                            {page}
                                        </PaginationLink>
                                    </PaginationItem>
                                ))}
                                {/* Trailing ellipsis and last page */}
                                {getPageNumbers().slice(-1)[0] < totalPages && (
                                    <>
                                        {getPageNumbers().slice(-1)[0] < totalPages - 1 && (
                                            <PaginationItem>
                                                <PaginationEllipsis />
                                            </PaginationItem>
                                        )}
                                        <PaginationItem>
                                            <PaginationLink
                                                href="#"
                                                isActive={currentPage === totalPages}
                                                onClick={e => { e.preventDefault(); handlePageChange(totalPages); }}
                                            >{totalPages}</PaginationLink>
                                        </PaginationItem>
                                    </>
                                )}
                                <PaginationItem>
                                    <PaginationNext
                                        href="#"
                                        onClick={e => { e.preventDefault(); handlePageChange(currentPage + 1); }}
                                        aria-disabled={currentPage === totalPages}
                                    />
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default Chemicals