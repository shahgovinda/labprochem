import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { motion } from "motion/react"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb'

export const Gallery = () => {
  const [showCarousel, setShowCarousel] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [carouselApi, setCarouselApi] = useState<any>(null)
  const [galleryItems, setGalleryItems] = useState<{ name: string }[]>([])

  // Fetch auto-generated gallery.json
  useEffect(() => {
    fetch("/gallery.json")
      .then(res => res.json())
      .then((files: string[]) => {
        setGalleryItems(files.map(name => ({ name })))
      })
      .catch(err => console.error("Failed to load gallery.json", err))
  }, [])

  // Scroll carousel when index changes
  useEffect(() => {
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
            <BreadcrumbPage>Gallery</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <section className='max-w-6xl mx-auto px-6 md:px-3 lg:px-0 py-16'>
        <span className='text-center font-extrabold text-2xl flex gap-2 items-center justify-center uppercase'>
          <h2 className='bg-primary text-white p-2 rounded-'>Gallery</h2>
        </span>

        <div className='mt-10'>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10'>
            {galleryItems.map((item, index) => (
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className='cursor-pointer overflow-hidden bg-cover bg-center antialiased h-[18rem] md:h-[22rem] rounded-xl hover:scale-102 transition shadow duration-300'
                key={index}
                onClick={() => { setShowCarousel(true); setSelectedIndex(index) }}
              >
                <img
                  src={`/images/gallery/${item.name}`}
                  alt={item.name}
                  className='w-full h-[84%] object-cover'
                />
                <p className='text-center h-[16%] flex justify-center items-center bg-primary text-white font-black'>
                  {item.name.replace(/\.[^/.]+$/, '')}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

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
            <div className="w-full max-w-3xl px-4">
              <Carousel
                className="relative"
                opts={{
                  align: "start",
                  startIndex: selectedIndex,
                }}
                setApi={setCarouselApi}
              >
                <CarouselContent>
                  {galleryItems.map((item, idx) => (
                    <CarouselItem key={idx}>
                      <div className="flex flex-col items-center">
                        <img
                          src={`/images/gallery/${item.name}`}
                          alt={item.name}
                          className="max-h-[80vh] w-auto rounded-xl border-4 border-white shadow-lg"
                        />
                        <p className="mt-4 text-center text-white font-bold text-lg">
                          {item.name.replace(/\.[^/.]+$/, '')}
                        </p>
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
      </section>
    </main>
  )
}

export default Gallery