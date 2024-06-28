'use client'
import GoogleCaptchaWrapper from '@/context/GoogleCaptchaWrapper'
import ReportForm from './ReportForm'

function reports() {
   
  return (
    <GoogleCaptchaWrapper>
      <ReportForm />
    </GoogleCaptchaWrapper>
  )
}
export default reports