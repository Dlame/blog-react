import { useState, useEffect, useCallback } from 'react';
import { $axios } from '../utils/interceptor';
import useMount from './useMount';

/**
 * useAntdTable hooks 用于处理 loading 逻辑以及换页 检索等
 *
 * @param {Object} obj
 * @param {Function} obj.fetchList 获取列表的函数
 * @param {Object} obj.queryParams 默认要检索的参数
 */

export default function useAntdTable({
  requestUrl = '',
  queryParams = null,
  columns = [],
  isAdmin = true,
}) {
  const [loading, setLoading] = useState(false);
  const [dataList, setDataList] = useState([]);
  const [tablePagination, setTablePagination] = useState({ current: 1, pageSize: 10, totoal: 0 });
}
