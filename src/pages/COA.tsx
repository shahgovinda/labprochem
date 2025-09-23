import { Button } from '@/components/ui/button';
import coa_data from '@/data/coa_list1.json';
import React, { useState } from 'react'
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import PdfModal from '@/components/PDFModal';

const ITEMS_PER_PAGE = 15;

/**
 * COA
 *
 * This component renders a table of CoA data.
 * The component includes a search bar and a table with columns for Item Name, Catalogue Number, CAS Number, Batch Number, and COA.
 * The table is paginated and has a maximum of 10 items per page.
 * The component also includes a mobile view that renders a card view of the data.
 *
 * @return {JSX.Element} The COA component.
 */
const COA = () => {

    const [currentPage, setCurrentPage] = useState(1);
    const [pdfUrl, setPdfUrl] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');

    // Utility to clean up ItemName: remove extra spaces and trim
    const cleanItemName = (name: string) =>
        name
            .replace(/\s+/g, ' ') // collapse spaces
            .replace(/[‘’“”]/g, '') // remove curly single and double quotes
            .trim();

    // Add coaLink to each item
    const coaDataWithLinks = coa_data.map(item => ({
        ...item,
        ItemName: cleanItemName(item.ItemName),
        coaLink: `pdfs/coa/${encodeURIComponent(item.CatalogueNumber)}.pdf`
    }));

    // Filter data based on search query
    const filteredData = coaDataWithLinks.filter(item =>
        item.ItemName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.CatalogueNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        String(item.CASNumber).toLowerCase().includes(searchQuery.toLowerCase()) ||
        String(item.BatchNumber).toLowerCase().includes(searchQuery.toLowerCase())
    );

    const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);

    const paginatedData = filteredData.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1); // Reset to first page on new search
    };

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setCurrentPage(1);
    };

    const getPageNumbers = () => {
        const pages = [];
        let start = Math.max(1, currentPage - 2);
        let end = Math.min(totalPages, currentPage + 2);

        if (currentPage <= 3) {
            end = Math.min(5, totalPages);
        } else if (currentPage >= totalPages - 2) {
            start = Math.max(1, totalPages - 4);
        }

        for (let i = start; i <= end; i++) {
            pages.push(i);
        }
        return pages;
    };

    return (
        <main className='border-t border-gray-200 '>
            <PdfModal fileUrl={pdfUrl} onClose={() => setPdfUrl(null)} />
            <Breadcrumb className='max-w-6xl mx-auto px-6 md:px-3 lg:px-0 py-8'>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/">Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Certificates of Analysis</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <section className='max-w-6xl mx-auto px-6 md:px-3 lg:px-0 py-8 lg:py-16'>
                <span className='text-center font-extrabold text-2xl flex gap-2 items-center justify-center uppercase'>
                    <h2 className='text-center  text-2xl'>certificate of</h2>
                    <h2 className='bg-primary text-white p-2 rounded-'>analysis</h2>
                </span>

                <div className='mt-6'>
                    <div className='flex justify-center md:justify-end  mb-5'>

                        <form className=' relative flex items-center gap-2' onSubmit={handleSearchSubmit}>
                            <Input type="text" onChange={handleSearchChange} value={searchQuery}
                                placeholder=" Search CoA by Name, CAS Number, etc."
                                className="w-78 focus:ring-primary hover:border-primary pl-9" />
                            {/* <Button size={'icon'} type='submit' className='bg-primary text-white '><Search /></Button> */}
                            <span className='absolute left-2'><Search color='gray' size={20} /></span>
                        </form>
                    </div>
                    <div className="overflow-x-auto bg-white rounded-lg shadow hidden md:block">
                        <table className="min-w-full text-sm text-left border border-gray-200">
                            <thead className="bg-gray-100 text-gray-700 font-semibold">
                                <tr>
                                    <th className="px-4 py-3">No.</th>
                                    <th className="px-4 py-3">Item Name</th>
                                    <th className="px-4 py-3">Catalog Number</th>
                                    <th className="px-4 py-3">CAS Number</th>
                                    <th className="px-4 py-3">Batch Number</th>
                                    <th className="px-4 py-3">COA</th>
                                    {/* <th className="px-4 py-3">MSDS</th> */}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {paginatedData.map((item, index) => (
                                    <tr key={index} className="hover:bg-gray-50">
                                        <td className="px-4 py-3">{item.ID}</td>
                                        <td
                                            className="px-4 py-3 text-gray-900 hover:underline cursor-pointer"
                                        >
                                            <a
                                                href={item.coaLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="hover:underline"
                                            >
                                                {item.ItemName}
                                            </a>
                                        </td>
                                        <td className="px-4 py-3">{item.CatalogueNumber}</td>
                                        <td className="px-4 py-3">{item.CASNumber}</td>
                                        <td className="px-4 py-3">{item.BatchNumber}</td>
                                        <td className="px-4 py-3 text-blue-600 underline cursor-pointer">
                                            <a
                                                href={item.coaLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-600 underline cursor-pointer"
                                            >
                                                Click To View
                                            </a>
                                        </td>
                                        {/* <td className="px-4 py-3 text-blue-600 underline cursor-pointer">
                                            <a href={item.msdsLink}>Click here</a>
                                        </td> */}
                                    </tr>
                                ))}
                                {paginatedData.length === 0 && (
                                    <tr>
                                        <td colSpan={5} className="text-center py-6 font-bold text-neutral-500">No results found.</td>
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
                                        <tbody className='text-sm  space-y-5'>
                                            <tr>
                                                <td className="font-bold whitespace-nowrap p-2">No. :</td>
                                                <td className='p-2'>{item.ID}</td>
                                            </tr>
                                            <tr className='bg-zinc-100'>

                                                <td className="font-bold whitespace-nowrap p-2">Item Name :</td>
                                                <td className="p-2 w-full text-gray-900 cursor- hover:underline">
                                                    <a
                                                        href={item.coaLink}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="hover:underline"
                                                    >
                                                        {item.ItemName}
                                                    </a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="font-bold whitespace-nowrap p-2">Catalog Number :</td>
                                                <td className='p-2'>{item.CatalogueNumber}</td>
                                            </tr>
                                            <tr>
                                                <td className="font-bold whitespace-nowrap p-2">CAS Number :</td>
                                                <td className='p-2'>{item.CASNumber}</td>
                                            </tr>
                                            <tr>
                                                <td className="font-bold whitespace-nowrap p-2">Batch Number :</td>
                                                <td className='p-2'>{item.BatchNumber}</td>
                                            </tr>
                                            <tr>
                                                <td className="font-bold whitespace-nowrap p-2">COA :</td>
                                                <td className='p-2'>
                                                    <a
                                                        href={item.coaLink}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-blue-600 underline cursor-pointer"
                                                    >
                                                        Click To View
                                                    </a>
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

export default COA;


