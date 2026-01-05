
export function GreenLetter( {letter}: {letter: string} ) {
  return (
    <span className='text-green-500 font-bold'>
      {letter}
    </span>
  )
}

export function RedLetter({ letter }: {letter: string}) {
  return (
    <span className="text-red-500 font-bold">{letter}</span>
  )
}

export function DefaultLetter({ letter }: {letter: string}) {
  return (
    <span className="text-gray-500 font-bold">{letter}</span>
  )
}

export function ExtraLetter({ letter }: {letter: string}) {
  return (
    <span className="text-red-500 underline font-bold">{letter}</span>
  )
}

export function Letter({ letter, type}: {letter: string, type: "correct" | "false" | "default" | "extra"}){
  if (type === "correct"){
    return <GreenLetter letter={letter} />
  } else if (type === "false"){
    return <RedLetter letter={letter} />
  } else if( type === "default"){ 
    return <DefaultLetter letter={letter} />
  } else if (type === "extra"){
    return (
      <ExtraLetter letter={letter} />
    )
  }
}


export function Space() {
  return <span className="mx-1"> </span>;
}