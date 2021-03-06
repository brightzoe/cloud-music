import React, { useEffect } from "react";
import { connect } from "react-redux";
import * as actionTypes from "./store/actionCreators";
import Slider from "../../components/slider";
import RecommendList from "../../components/list";
import Scroll from "../../components/scroll";
import { Content } from "./style";
import { getRecommendListRequest } from "../../api/request";
import { forceCheck } from "react-lazyload";
import Loading from "../../baseUI/loading/index";
function Recommend(props) {
	const { bannerList, recommendList, enterLoading } = props;
	const { getBannerDataDispatch, getRecommendListDataDispatch } = props;
	useEffect(() => {
		if (!bannerList.size) {
			getBannerDataDispatch();
		}
		if (!recommendList.size) {
			getRecommendListDataDispatch();
		}
		//eslint-disable-next-line
	}, []);
	const bannerListJS = bannerList ? bannerList.toJS() : [];
	const recommendListJS = recommendList ? recommendList.toJS() : [];
	return (
		<Content>
			<Scroll className="list" onScroll={forceCheck}>
				<div>
					<Slider bannerList={bannerListJS}></Slider>
					<RecommendList recommendList={recommendListJS}></RecommendList>
				</div>
			</Scroll>
			{enterLoading ? <Loading></Loading> : null}
		</Content>
	);
}

//映射Redux全局state到组件的props
const mapStateToProps = (state) => ({
	bannerList: state.getIn(["recommend", "bannerList"]),
	recommendList: state.getIn(["recommend", "recommendList"]),
	enterLoading: state.getIn(["recommend", "enterLoading"]),
});

//映射dispatch到props
const mapDispatchToProps = (dispatch) => {
	return {
		getBannerDataDispatch() {
			dispatch(actionTypes.getBannerList());
		},
		getRecommendListDataDispatch() {
			dispatch(actionTypes.getRecommendList());
		},
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Recommend));
