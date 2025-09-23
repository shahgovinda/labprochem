import { Button } from '@/components/ui/button'
import React, { useEffect, useState } from 'react'
import { ArrowRight, Maximize, X } from 'lucide-react'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel'
import { useNavigate } from 'react-router'
import { motion } from "motion/react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'

const certificateImages = [
    {
        image: '/images/certificates/iso-9001-2015.new2.jpg',
        title: 'Certificate of ISO 9001:2015'
    },
    {
        image: '/images/certificates/iso-9001-2015.new2.jpg',
        title: 'Certificate of ISO 9001:2015'
    },
    {
        image: '/images/certificates/iso-9001-2015.new.jpg',
        title: 'Certificate of ISO 9001:2015'
    },
    {
        image: '/images/certificates/iso-9001-2015.new3.jpg',
        title: 'Certificate of ISO 9001:2015'
    },

    {
        image: '/images/certificates/iso-9001-2015.new3.jpg',
        title: 'Certificate of ISO 9001:2015'
    },
    {
        image: '/images/certificates/iso-9001-2015.new.jpg',
        title: 'Certificate of ISO 9001:2015'
    },
]


const CompanyProfile = () => {

    const navigate = useNavigate()
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
        <main>

            <Breadcrumb className='max-w-6xl mx-auto px-6 md:px-3 lg:px-0 py-8'>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/">Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Company Profile</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            {/* about us  */}
            <section className='bg-gray-50  py-15'>
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.6 }}
                    className='max-w-6xl mx-auto px-7 md:px-10 lg:px-0'>

                    <div className='flex flex-col md:flex-row justify-between gap-y-10 gap-x-25 '>

                        <div className='w-full md:w-auto flex justify-center'>
                            <img src="/Brand Logo.png" alt="" className='size-[250px] border md:size-[350px]' />
                        </div>

                        <div className=' flex-1 flex flex-col item-center justify-between gap-5'>
                            <span className='text-center font-extrabold text-2xl flex gap-2 items-center justify-center uppercase'>
                                <h2 className='bg-primary text-white p-2 rounded-'>LabPro</h2>
                                <h2 className='text-center  text-2xl'>Chem</h2>
                            </span>
                            <div className='space-y-2   '>
                                <h4 className=' font-bold text-2xl'>Manufacturers of Laboratory Reagents and Fine Chemicals</h4>
                                <p className='text-justify font-medium'>LabPro Chem is a Mumbai-based supplier and distributor of laboratory-grade chemicals, solvents, and reagents. With years of experience in the chemical distribution industry, we cater to a wide range of industries including:</p>
                                <ul className='list-disc pl-5 text-sm text-gray-700 space-y-1 mt-10 font-semibold'>
                                    <li>Research & Development labs</li>
                                    <li>Pharmaceuticals & Biotechnology</li>
                                    <li>Educational Institutions</li>
                                    <li>Industrial Labs</li>
                                </ul>
                            </div>
                        </div>

                    </div>

                </motion.div>
            </section>

            {/* our mission and vision */}
            <section className='bg-white py-20 md:py-22 border'>
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.6 }}
                    className='max-w-6xl mx-auto px-5 md:px-10 lg:px-0'>
                    <span className='text-center font-extrabold text-2xl flex gap-2 items-center justify-center uppercase'>
                        <h2 className='text-center  text-2xl'>Our Mission &</h2>
                        <h2 className='bg-primary text-white p-2 rounded-'>Vision</h2>
                    </span>

                    <div className='py-10 text-center'>
                        <p className=' font-medium text-lg mb-2 text-justify'>
                        Our goal is to provide high-purity materials at competitive prices, backed by responsive service and timely delivery.
                        </p>
                        <p className=' font-medium text-lg mb-2 text-justify'>
                        Our vision is to be recognized by our clients as a preferred problem-solving applied research group, solving our client's specific needs in the environmental, chemical, process optimization, and industrial forensics specialties by linking technology to solutions.
                        </p>
                    </div>
                    {/* <div className='  grid grid-rows-7 md:grid-rows-4 grid-cols-1 md:grid-cols-2 gap-5 py-10'>
                        <div className=''>
                            <h4 className=' font-black text-lg mb-2'>Our Mission</h4>
                            <p className='text-justify text-sm font-semibold'>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt officiis at doloribus impedit libero, facilis maiores, neque vero inventore consequatur eligendi! Quisquam id nesciunt cum laborum adipisci consequuntur excepturi odit officiis eius! Velit illum aperiam cumque aliquid eveniet? Dolorem recusandae omnis odio laborum ullam.
                            </p>
                        </div>
                        <div className=''>
                            <h4 className=' font-black text-lg mb-2'>Our Vision</h4>
                            <p className='text-justify text-sm font-semibold'>
                                Our vision is to be recognized by our clients as a preferred problem-solving applied research group, solving our client's specific needs in the environmental, chemical, process optimization, and industrial forensics specialties by linking technology to solutions.                          </p>
                        </div>
                        <div className=' md:col-span-2 '>
                            <h4 className=' font-black text-lg mb-2'>Our Core Values</h4>
                            <p className='text-justify text-sm font-semibold'>
                                Our core values define and characterize how we as Alpha Chemika employees conduct ourselves in our drive for tangible, lasting results and are as indispensable to success as our unifying mission and vision. Our values include:                            </p>
                        </div>
                        <div className=''>
                            <h4 className=' font-black text-lg mb-2'>Integrity</h4>
                            <p className='text-justify text-sm font-semibold'>
                                For us, Integrity implies honesty and transparency in our business processes and the highest level of ethical behaviour and professional act in customer services.                            </p>
                        </div>
                        <div className=''>
                            <h4 className=' font-black text-lg mb-2'>Customer Focus</h4>
                            <p className='text-justify text-sm font-semibold'>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel ab beatae labore mollitia, nobis natus obcaecati culpa eum sunt soluta asperiores nam aliquam expedita facere maiores, excepturi, quis odio magnam enim! Dolores deleniti ullam fugiat rerum error eligendi.
                            </p>
                        </div>
                        <div className=''>
                            <h4 className=' font-black text-lg mb-2'>Our Mission</h4>
                            <p className='text-justify text-sm font-semibold'>
                                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sapiente at pariatur quam natus quibusdam vitae distinctio unde nisi, dolore recusandae beatae excepturi doloribus velit facilis quidem reiciendis aliquid enim impedit!
                            </p>
                        </div>
                        <div className=''>
                            <h4 className=' font-black text-lg mb-2'>Our Mission</h4>
                            <p className='text-justify text-sm font-semibold'>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit doloremque tempora sed consequuntur atque laudantium asperiores ipsam explicabo in. Expedita?
                            </p>
                        </div>
                    </div> */}
                </motion.div>
            </section>

            {/* certicicates section */}
            {/* <section className='bg-gray-50 py-22'>
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.6 }}
                    className='max-w-6xl mx-auto px-7 md:px-10 lg:px-0'>
                    <span className='text-center font-extrabold text-2xl flex gap-2 items-center justify-center uppercase'>
                        <h2 className='text-center  text-2xl'>Our</h2>
                        <h2 className='bg-primary text-white p-2 rounded-'>Certifications</h2>
                    </span>

                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 pt-20'>
                        {
                            certificateImages.map((item, index) => (
                                <div className='space-y-2' key={index} onClick={() => { setShowCarousel(true); setSelectedIndex(index) }}>
                                    <div style={{ backgroundImage: `url(${item.image})` }}
                                        className={` cursor-pointer bg-cover bg-center antialiased h-[410px] md:h-[500px] rounded-xl hover:scale-102 border-2 border-violet-400 hover:border-2 duration-300`}>
                                        <div className='opacity-0 hover:opacity-100 bg-black/20 h-full flex items-center justify-center '>
                                            <Button variant={'secondary'} size={'lg'}> <Maximize />View</Button>
                                        </div>
                                    </div>
                                    <p className='text-center text-primary font-black'>{item.title}</p>
                                </div>
                            ))
                        }

                    </div>
                    <div className='flex justify-center mt-10'>
                        <Button onClick={() => navigate('/certifications')}>See All <ArrowRight /></Button>
                    </div>
                </motion.div>
            </section> */}

            {/* Fullscreen Carousel Modal */}
            {showCarousel && (
                <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center">
                    <Button
                        className="absolute top-4 right-4 z-50"
                        variant="secondary"
                        size="icon"
                        onClick={() => setShowCarousel(false)}
                    >
                        <X size={28} />
                    </Button>
                    <div className="md:max-w-2xl lg:max-w-3xl px-4">
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

export default CompanyProfile