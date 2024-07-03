const typeCalculator = (format: string | undefined) => {
    if(format === 'Classic Constructed' || format === 'Living Legend'){
      return 'adult'
    }
  
    if(format === 'Blitz' || format === 'Draft' || format === 'Sealed'){
      return 'young'
    }
  
    return 'both'
}

export default typeCalculator