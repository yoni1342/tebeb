import React from 'react';
import Link from 'next/link';
function Thumbnail({img, id}) {
	return (
		<Link href={`/video/${id}`}>
			<div className="relative w-[20rem] h-[15rem] group cursor-pointer flex flex-col justify-center">
				<img src={img} className="h-full w-full object-cover " />
				<div className="absolute top-0 w-full h-full bg-black opacity-20  flex items-center justify-center" />
				<img
					src="/play.icon.png"
					className="w-28 absolute top-[20%] left-[30%] opacity-0 group-hover:opacity-100 transition duration-150 group-active:scale-95 flex items-center justify-center"
				/>
			</div>
		</Link>
	);
}

export default Thumbnail;
