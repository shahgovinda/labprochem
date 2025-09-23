import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import React from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

const SearchPage = () => {
  return (
    <main>
      <Breadcrumb className='max-w-6xl mx-auto px-6 md:px-3 lg:px-0 py-8'>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Search Chemicals</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className='max-w-6xl mx-auto px-6 md:px-3 lg:px-0 py-10'>
        <span className='text-center font-extrabold text-lg md:text-2xl flex gap-2 items-center justify-center uppercase'>
          <h2 className='text-center'>SEARCH</h2>
          <h2 className='bg-primary text-white p-2 rounded-'>chemicals</h2>
        </span>

        <section className='md:mt-10  flex items-center justify-center py-10'>

          <form action="" className='w-full '>
            <div className=' w-full lg:w-[55%] mx-auto relative shadow-xl rounded-full'>
              <Input type="text" autoFocus autoComplete='on' className='w-full placeholder:text-sm md:placeholder:text-lg pl-5 pr-15 border-primary  rounded-full h-12 lg:h-15' placeholder='Search Chemical by Name / CAS Number' />
              <button type='submit' className='absolute cursor-pointer right-1 lg:right-2 p-2  lg:p-3  bg-primary rounded-full top-1/2 -translate-y-1/2 hover:bg-violet-400 transition-all duration-300 ease-in-out'>
                <Search stroke='white' className='' />
              </button>
            </div>
          </form>

          {/* results table here */}
          <div>

          </div>

        </section>
      </div>
    </main>
  )
}

export default SearchPage