import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { FluidEngine, Navigation, CustomCursor, Footer } from '@/components'
import { Home, Products, Esports, Athletes, About, Contact, Dashboard } from '@/pages'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <>
      <FluidEngine />
      <Navigation />
      <CustomCursor />
      <div className="relative z-10">
        {children}
        <Footer />
      </div>
    </>
  )
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route
          path="/"
          element={
            <PageWrapper>
              <Home />
            </PageWrapper>
          }
        />
        <Route
          path="/products"
          element={
            <PageWrapper>
              <Products />
            </PageWrapper>
          }
        />
        <Route
          path="/esports"
          element={
            <PageWrapper>
              <Esports />
            </PageWrapper>
          }
        />
        <Route
          path="/athletes"
          element={
            <PageWrapper>
              <Athletes />
            </PageWrapper>
          }
        />
        <Route
          path="/about"
          element={
            <PageWrapper>
              <About />
            </PageWrapper>
          }
        />
        <Route
          path="/contact"
          element={
            <PageWrapper>
              <Contact />
            </PageWrapper>
          }
        />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </>
  )
}
