import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { add } from '../../store/slices/questionSlice';
function Question({ question, options, index, id }) {
	const questionState = useSelector((state) => state);
	const dispatch = useDispatch();
	// const
	return (
		<div className="py-3 px-4">
			{/* question */}
			<div>
				<p className="text-2xl font-light tracking-wider text-black capitalize">
					{index + 1} &#183; {question}
				</p>
			</div>
			{/* choise */}
			<div className="space-y-3 py-4 px-3">
				{options.map((option) => (
					<div className="flex space-x-3 items-center">
						{questionState[id] == option ? (
							<input
								type="radio"
								name={index}
								id={index}
								value={index}
								checked
								className="w-6 h-6"
								onChange={() => dispatch(add({ id, option }))}
							/>
						) : (
							<input
								type="radio"
								name={index}
								id={index}
								value={index}
								className="w-6 h-6"
								onChange={() => dispatch(add({ id, option }))}
							/>
						)}
						<label for={index} className="text-black text-xl">
							{option}
						</label>
					</div>
				))}
			</div>
		</div>
	);
}

export default Question;
