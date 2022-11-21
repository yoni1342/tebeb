import React from 'react'

function Question({question, options, index}) {
  return (
    <div className='py-3 px-4'> 
            {/* question */}
            <div>
                <p className='text-2xl font-light tracking-wider text-black capitalize'>
                    {index+1} &#183; {question}
                </p>
            </div>
            {/* choise */}
            <div className='space-y-3 py-4 px-3'> 
                {
                    options.map((option)=>(
                    <div className='flex space-x-3 items-center'>
                        <input type="radio" name="radio" id={index} className="w-6 h-6" />
                        <label for={index} className='text-black text-xl'>
                            {option}
                        </label>
                    </div>
                    ))
                }
            </div>  
        </div>
  )
}

export default Question