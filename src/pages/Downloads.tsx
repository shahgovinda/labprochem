import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import React from 'react'
import { motion } from "motion/react"
import { Button } from '@/components/ui/button'
import { FileText, Maximize } from 'lucide-react'

const pdfs = [
    {
        thumbnail: '/images/price_list-2025.png',
        title: 'Price List 2025',
        file: '/pdfs/price_list/Price List 2025.pdf'
    },
   
   
 
]

const Downloads = () => {
    return (
        <main>
            <Breadcrumb className='max-w-6xl mx-auto px-6 md:px-3 lg:px-0 py-8'>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/">Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Downloads</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <section className='max-w-6xl mx-auto px-6 md:px-3 lg:px-0 py-16'>
                <span className='text-center font-extrabold text-2xl flex gap-2 items-center justify-center uppercase'>
                    {/* <h2 className='text-center  text-2xl'>certificate of</h2> */}
                    <h2 className='bg-primary text-white p-2 rounded-'>Downloads</h2>
                </span>

                <div className='mt-8'>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-25 gap-y-10'>
                        {
                            pdfs.map((item, index) => (
                                <motion.div
                                    initial={{ opacity: 0, y: 40 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                    className='space-y-2 group cursor-pointer '
                                    key={index}
                                    // onClick={() => { setShowCarousel(true); setSelectedIndex(index) }}
                                    >
                                    <div style={{ backgroundImage: `url(${item.thumbnail})`}}
                                        className={`  overflow-hidden bg-cover bg-center antialiased h-[410px] md:h-[420px] rounded-xl group-hover:scale-102 border-2 border-violet-400 hover:border-2 duration-300`}>
                                        <div className='opacity-0 hover:opacity-100 bg-black/20 h-full flex items-center justify-center '>
                                            <Button variant={'secondary'} size={'lg'} onClick={() => window.open(item.file, '_blank')}> <Maximize />View</Button>
                                        </div>
                                    </div>
                                    <p className='text-center text-primary font-black flex gap-2 items-center justify-center'  onClick={() => window.open(item.file, '_blank')}><FileText />{item.title}</p>
                                </motion.div>
                            ))
                        }

                    </div>
                </div>
            </section>
        </main>
    )
}

export default Downloads