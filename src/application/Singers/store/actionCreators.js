import * as actionTypes from "./constants";
import { fromJS } from "immutable";
import { getHotSingerListRequest, getSingerListRequest } from "@/api/request";
import {
	CHANGE_SINGER_LIST,
	CHANGE_CATOGORY,
	CHANGE_ALPHA,
	CHANGE_PAGE_COUNT,
	CHANGE_PULLUP_LOADING,
	CHANGE_PULLDOWN_LOADING,
	CHANGE_ENTER_LOADING,
} from "./constants";

export const changeSingerList = (data) => ({ type: CHANGE_SINGER_LIST, data: fromJS(data) });

export const changePageCount = (data) => ({
	type: CHANGE_PAGE_COUNT,
	data,
});

//进场loading
export const changeEnterLoading = (data) => ({
	type: CHANGE_ENTER_LOADING,
	data,
});

//滑到最底部loading
export const changePullUpLoading = (data) => ({
	type: CHANGE_PULLUP_LOADING,
	data,
});

//顶部下拉刷新loading
export const changePullDownLoading = (data) => ({
	type: CHANGE_PULLDOWN_LOADING,
	data,
});

/**
 * 第一次加载热门歌手
 * @returns
 */
export const getHotSingerList = () => {
	return (dispatch) => {
		getHotSingerListRequest(0)
			.then((res) => {
				const data = res.artists;
				dispatch(changeSingerList(data));
				dispatch(changeEnterLoading(false));
				dispatch(changePullDownLoading(false));
			})
			.catch(() => {
				console.log("热门歌手数据获取失败");
			});
	};
};

/**
 * 加载更多热门歌手
 * @returns
 */
export const refreshMoreHotSingerList = () => {
	return (dispatch, getState) => {
		const pageCount = getState().getIn(["singers", "pageCount"]);
		const singerList = getState().getIn(["singers", "singerList"]);
		getHotSingerListRequest(pageCount)
			.then((res) => {
				const data = [...singerList, ...res.artists];
				dispatch(changeSingerList(data));
				dispatch(changePullUpLoading(false));
			})
			.catch(() => {
				console.log("热门歌手数据获取失败");
			});
	};
};

/**
 * 第一次加载对应类别歌手
 * @param {*} type
 * @param {*} alpha
 * @returns
 */
export const getSingerList = (type, alpha) => {
	return (dispatch, getState) => {
		getSingerListRequest(type, alpha, 0)
			.then((res) => {
				const data = res.artists;
				dispatch(changeSingerList(data));
				dispatch(changeEnterLoading(false));
				dispatch(changePullDownLoading(false));
			})
			.catch(() => {
				console.log("歌手数据获取失败");
			});
	};
};

/**
 * 加载更多对应类别的歌手
 * @param {*} type
 * @param {*} alpha
 * @returns
 */
export const refreshMoreSingerList = (type, alpha) => {
	return (dispatch, getState) => {
		const pageCount = getState().getIn(["singers", "pageCount"]);
		const singerList = getState().getIn(["singers", "singerList"]).toJS();
		getSingerListRequest(type, alpha, pageCount)
			.then((res) => {
				const data = [...singerList, ...res.artists];
				dispatch(changeSingerList(data));
				dispatch(changePullUpLoading(false));
			})
			.catch(() => {
				console.log("歌手数据获取失败");
			});
	};
};
