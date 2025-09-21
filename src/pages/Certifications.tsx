import { Button } from '@/components/ui/button'
import { Maximize, X } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { motion } from "motion/react"

const certificateImages = [
   
{
    image: '/images/certificates/gst_certificate.png',
    title: 'Certificate of GST'
},
{
    image: '/images/certificates/msme_certificate.png',
    title: 'MSME Udhyam Certificate'
},
{
    image: '/images/certificates/registration_certificate.jpeg',
    title: 'Certificate of Registration'
},

]

/**
 * The Certifications page displays a list of certifications held by the company.
 * When a certification is clicked, a modal appears with a carousel of images
 * that can be scrolled through using the arrow keys or the arrows on the side
 * of the carousel.
 *
 * The carousel is full-screen and can be closed by clicking the X button in the
 * top-right corner.
 */
const Certifications = () => {

    const [showCarousel, setShowCarousel] = useState(false)
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [carouselApi, setCarouselApi] = useState<any>(null)

    // When selectedIndex changes, scroll carousel to that slide
    React.useEffect(() => {
        if (showCarousel && carouselApi) {
            carouselApi.scrollTo(selectedIndex)
        }
    }, [showCarousel, selectedIndex, carouselApi])


    return (
        <main className='bg-neutral-50'>
            <Breadcrumb className='max-w-6xl mx-auto px-6 md:px-3 lg:px-0 py-8'>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/">Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbItem>
                        <BreadcrumbSeparator />
                    </BreadcrumbItem>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/profile">About</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbItem>
                        <BreadcrumbSeparator />
                    </BreadcrumbItem>
                    <BreadcrumbItem>
                        <BreadcrumbPage>Our Certifications</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <section className='max-w-6xl mx-auto py-15 px-16 md:px-0'>

                <span className='text-center font-extrabold text-lg md:text-2xl flex gap-2 items-center justify-center uppercase'>
                    <h2 className='text-center'>Our</h2>
                    <h2 className='bg-primary text-white p-2 rounded-'>Certifications</h2>
                </span>

                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 pt-20'>
                    { 
                        certificateImages.map((item, index) => (
                            <motion.div
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className='space-y-2 '
                                key={index}
                                onClick={() => { setShowCarousel(true); setSelectedIndex(index) }}>
                                <div style={{ backgroundImage: `url(${item.image})` }}
                                    className={` cursor-pointer overflow-hidden bg-cover bg-center antialiased h-[410px] md:h-[500px] rounded-xl hover:scale-102 border-2 border-violet-400 hover:border-2 duration-300`}>
                                    <div className='opacity-0 hover:opacity-100 bg-black/20 h-full flex items-center justify-center '>
                                        <Button variant={'secondary'} size={'lg'}> <Maximize />View</Button>
                                    </div>
                                </div>
                                <p className='text-center text-primary font-black'>{item.title}</p>
                            </motion.div>
                        )) 
                    }

                </div>
            </section>

            {/* Fullscreen Carousel Modal */}
            {showCarousel && (
                <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center">
                    <Button
                        className="absolute top-4 right-4 z-50"
                        variant="secondary"
                        size="icon"
                        onClick={() => setShowCarousel(false)}
                    >
                        <X size={28} />
                    </Button>
                    <div className="w-full  max-w-3xl px-4">
                        <Carousel
                            className="relative"
                            opts={{
                                align: "start",
                                // loop: true,
                                startIndex: selectedIndex,
                            }}
                            setApi={setCarouselApi}
                        >
                            <CarouselContent>
                                {certificateImages.map((item, idx) => (
                                    <CarouselItem key={idx}>
                                        <div className="flex flex-col items-center">
                                            <img
                                                src={item.image}
                                                alt={item.title}
                                                className="max-h-[80vh] w-auto rounded-xl border-4 border-white shadow-lg"
                                            />
                                            <p className="mt-4 text-center text-white font-bold text-lg">{item.title}</p>
                                        </div>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                            <CarouselPrevious className="hidden sm:flex" />
                            <CarouselNext className="hidden sm:flex" />
                        </Carousel>
                    </div>
                </div>
            )}

        </main>
    )
}

export default Certifications
