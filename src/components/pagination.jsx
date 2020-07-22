import React from 'react';

class Pagination extends React.Component {
	state = {
		isEditable: false,
	};
	render() {
		const {
			currentPage,
			totalPage,
			goToTop,
			next,
			prev,
			isPrevious,
			isNext,
			handlePageChange,
			goToPage,
		} = this.props;

		return (
			<div className='d-flex my-5 align-items-center'>
				<button
					className='btn btn-warning'
					disabled={!isPrevious}
					onClick={() => {
						prev();
						goToTop();
					}}
				>
					Previous
				</button>
				<div className='flex-grow-1 text-center'>
					{this.state.isEditable ? (
						<input
							type='number'
							value={currentPage}
							onChange={(e) => handlePageChange(e.target.value)}
							onKeyPress={(e) => {
								if (e.key === 'Enter') {
									goToPage();
									this.setState({ isEditable: false });
								}
							}}
						/>
					) : (
						<p
							style={{ userSelect: 'none', lineHeight: '1.1' }}
							title='Double Tap to Jump Page'
							onDoubleClick={() =>
								this.setState({
									isEditable: !this.state.isEditable,
								})
							}
						>
							{currentPage} of {totalPage}
							<br />
							<small>Double Tap to Edit & Jump</small>
						</p>
					)}
				</div>
				<button
					className='btn btn-warning ml-auto'
					disabled={!isNext}
					onClick={() => {
						next();
						goToTop();
					}}
				>
					Next
				</button>
			</div>
		);
	}
}

export default Pagination;
