import React, {FC, useEffect, useRef, useState} from 'react'
import {SearchComponent} from '../../../assets/ts/components'
import {KTSVG, toAbsoluteUrl} from '../../../helpers'

const SearchNavbar: FC = () => {
  const [menuState, setMenuState] = useState<"main" | "advanced" | "preferences">("main");
  const element = useRef<HTMLDivElement | null>(null);
  const wrapperElement = useRef<HTMLDivElement | null>(null);
  const resultsElement = useRef<HTMLDivElement | null>(null);
  const suggestionsElement = useRef<HTMLDivElement | null>(null);
  const emptyElement = useRef<HTMLDivElement | null>(null);

  const processs = (search: SearchComponent) => {
    setTimeout(function() {
      const number = Math.floor(Math.random() * 6) + 1;

      // Hide recently viewed
      suggestionsElement.current!.classList.add('d-none');

      if (number === 3) {
        // Hide results
        resultsElement.current!.classList.add('d-none');
        // Show empty message
        emptyElement.current!.classList.remove('d-none');
      } else {
        // Show results
        resultsElement.current!.classList.remove('d-none');
        // Hide empty message
        emptyElement.current!.classList.add('d-none');
      }

      // Complete search
      search.complete();
    }, 1500);
  }

  const clear = (search: SearchComponent) => {
    // Show recently viewed
    suggestionsElement.current!.classList.remove('d-none');
    // Hide results
    resultsElement.current!.classList.add('d-none');
    // Hide empty message
    emptyElement.current!.classList.add('d-none');
  }

  useEffect(() => {
    // Initialize search handler
    const searchObject = SearchComponent.createInsance('#kt_header_search');

    // Search handler
    searchObject!.on('kt.search.process', processs);

    // Clear handler
    searchObject!.on('kt.search.clear', clear);
  }, [])

  return (
    <>
      <div
        id='kt_header_search'
        className='d-flex align-items-stretch'
        data-kt-search-keypress='false'
        data-kt-search-min-length='2'
        data-kt-search-enter='enter'
        data-kt-search-layout='menu'
        data-kt-menu-trigger='click'
        data-kt-menu-overflow='false'
        data-kt-menu-permanent='true'
        data-kt-menu-placement='bottom-end'
        ref={element}
      >
        <div
          className='d-flex align-items-center'
          data-kt-search-element='toggle'
          id='kt_header_search_toggle'
        >
          <div className='btn btn-icon btn-active-light-primary w-30px h-30px w-md-40px h-md-40px'>
            <KTSVG path='/media/icons/duotune/general/gen021.svg' className='svg-icon-white svg-icon-1' />
          </div>
        </div>

        <div
          data-kt-search-element='content'
          className='menu menu-sub menu-sub-dropdown p-3 w-325px w-md-375px'
        >
          <div className={`${menuState === 'main' ? '' : 'd-none'}`} ref={wrapperElement} data-kt-search-element='wrapper'>
            <form
              data-kt-search-element='form'
              className='w-100 position-relative'
              autoComplete='off'
            >
              <KTSVG
                path='/media/icons/duotune/general/gen021.svg'
                className='svg-icon-2 svg-icon-lg-1 svg-icon-gray-500 position-absolute top-50 translate-middle-y ms-0'
              />

              <input
                type='text'
                className='form-control form-control-flush ps-10'
                name='search'
                placeholder='Search...'
                data-kt-search-element='input'
              />

              <span
                className='position-absolute top-50 end-0 translate-middle-y lh-0 d-none me-1'
                data-kt-search-element='spinner'
              >
                <span className='spinner-border h-15px w-15px align-middle text-gray-400' />
              </span>

              <span
                className='btn btn-flush btn-active-color-primary position-absolute top-50 end-0 translate-middle-y lh-0 d-none'
                data-kt-search-element='clear'
              >
                <KTSVG
                  path='/media/icons/duotune/arrows/arr061.svg'
                  className='svg-icon-2 svg-icon-lg-1 me-0'
                />
              </span>
            </form>
        </div>
      </div>
      </div>
    </>
  )
}

export {SearchNavbar}
