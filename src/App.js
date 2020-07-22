import React, { useRef } from 'react';
import './App.css';
import News, { newsCategory } from './news';
import Header from './components/header';
import Loading from './components/loading';
import NewsList from './components/newsList';
import Pagination from './components/pagination';

const news = new News(newsCategory.technology);
class App extends React.Component {
	state = {
		data: {},
		isLoading: true,
	};

	constructor() {
		super();
		this.listScrollTop = React.createRef();
	}

	componentDidMount() {
		news.getNews()
			.then((res) => {
				this.setState({ data: res, isLoading: false });
			})
			.catch((e) => {
				console.log(e);
				alert('Some Went Wrong');
				this.setState({ isLoading: false });
			});
	}

	goToTop = () => {
		// console.log(this.listScrollTop);
		window.scroll(0, this.listScrollTop.current.scrollTop);
	};

	next = () => {
		if (this.state.data.isNext) {
			this.setState({ isLoading: true });
			news.next()
				.then((res) => {
					this.setState({ data: res, isLoading: false });
				})
				.catch((e) => {
					console.log(e);
					alert('Some Went Wrong');
					this.setState({ isLoading: false });
				});
		}
	};

	prev = () => {
		if (this.state.data.isPrevious) {
			this.setState({ isLoading: true });
			news.prev()
				.then((res) => {
					this.setState({ data: res, isLoading: false });
				})
				.catch((e) => {
					console.log(e);
					alert('Something Went Wrong');
					this.setState({ isLoading: false });
				});
		}
	};

	handlePageChange = (value) => {
		this.setState({
			data: {
				...this.state.data,
				currentPage: Number.parseInt(value),
			},
		});
	};

	goToPage = () => {
		this.setState({ isLoading: true });
		news.setCurrentPage(this.state.data.currentPage)
			.then((res) => {
				this.setState({ data: res, isLoading: false });
			})
			.catch((e) => {
				console.log(e);
				alert('Something Went Wrong');
				this.setState({ isLoading: false });
			});
	};

	changeCategory = (category) => {
		this.setState({ isLoading: true });
		news.changeCategory(category)
			.then((res) => {
				this.setState({ data: res, isLoading: false });
			})
			.catch((e) => {
				console.log(e);
				alert('Something Went Wrong');
				this.setState({ isLoading: false });
			});
	};

	search = (searchTerm) => {
		this.setState({ isLoading: true });
		news.search(searchTerm)
			.then((res) => {
				this.setState({ data: res, isLoading: false });
			})
			.catch((e) => {
				console.log(e);
				alert('Something Went Wrong');
				this.setState({ isLoading: false });
			});
	};

	render() {
		const {
			articles,
			isPrevious,
			isNext,
			category,
			totalResults,
			currentPage,
			totalPage,
		} = this.state.data;
		console.log(articles);
		return (
			<div className='container'>
				<div className='row'>
					<div className='col-md-6 offset-md-3'>
						<Header
							category={category}
							changeCategory={this.changeCategory}
							search={this.search}
						/>
						<div className='d-flex'>
							<p className='text-black-50'>
								About {totalResults ? totalResults : 0} results
								found
							</p>
							<p className='text-black-50 ml-auto'>
								{currentPage ? currentPage : 0} of
								{totalPage ? totalPage : 0}
							</p>
						</div>
						{this.state.isLoading ? (
							<Loading />
						) : (
							<div ref={this.listScrollTop}>
								<NewsList news={articles} />
								<Pagination
									next={this.next}
									prev={this.prev}
									isPrevious={isPrevious}
									isNext={isNext}
									goToTop={this.goToTop}
									totalPage={totalPage}
									currentPage={currentPage}
									handlePageChange={this.handlePageChange}
									goToPage={this.goToPage}
								/>
							</div>
						)}
					</div>
				</div>
			</div>
		);
	}
}

export default App;
