
function DynamicFontSizeElement({str, maxWidth, startingFontSize} : {str: string, maxWidth: number, startingFontSize: number}) {

  return (
    <div className={`text-[${str.length < (maxWidth/(startingFontSize*.65)) ? startingFontSize : Math.floor(startingFontSize*.5)}]px]`}>
        {str}
    </div>
  )
}
export default DynamicFontSizeElement


//maxWidth/(startingFontSize*.65)