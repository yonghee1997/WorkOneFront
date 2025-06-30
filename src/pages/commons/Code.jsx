import { useEffect, useState } from 'react';
import { Box, Paper, Tab, Tabs, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import api from '@utils/axios'; 

export default function CodeManagement() {
  const [tab, setTab] = useState(0);
  const [commonCodes, setCommonCodes] = useState([]);
  const [detailCodes, setDetailCodes] = useState([]);
  const [attrCodes, setAttrCodes] = useState([]);

  const fetchCommonCodes = async () => {
    try {
      const res = await api.get('/code/group');
      const data = res.data || [];
      setCommonCodes(data);

      if (data.length > 0) {
        const codeId = data[0].codeId;
        fetchDetailAndAttr(codeId);
      }
    } catch (e) {
      console.error('공통코드 그룹 조회 실패', e);
    }
  };

  const fetchDetailAndAttr = async (codeId) => {
    try {
      const [detailRes, attrRes] = await Promise.all([
        api.get(`/code/detail?codeId=${codeId}`),
        api.get(`/code/attr?codeId=${codeId}`)
      ]);
      setDetailCodes(detailRes.data || []);
      setAttrCodes(attrRes.data || []);
    } catch (e) {
      console.error('상세/속성 코드 조회 실패', e);
    }
  };

  useEffect(() => {
    fetchCommonCodes();
  }, []);

  const commonCodeColumns = [
    { field: 'codeId', headerName: '코드ID', flex: 1, headerAlign: 'center', align:'center', cellClassName: 'column-border' },
    { field: 'codeNm', headerName: '코드명', flex: 1, headerAlign: 'center', align:'left', cellClassName: 'column-border' },
    { field: 'description', headerName: '설명', flex: 1, headerAlign: 'center', align:'left', cellClassName: 'column-border' },
    { field: 'useYn', headerName: '사용여부', flex: 1, headerAlign: 'center', align:'center', cellClassName: 'column-border' },
    { field: 'createDt', headerName: '생성일자', flex: 1, headerAlign: 'center', align:'left', cellClassName: 'column-border' },
    { field: 'createId', headerName: '생성자', flex: 1, headerAlign: 'center', align:'center', cellClassName: 'column-border' },
    { field: 'updateDt', headerName: '변경일자', flex: 1, headerAlign: 'center', align:'left', cellClassName: 'column-border' },
    { field: 'updateId', headerName: '변경자', flex: 1, headerAlign: 'center', align:'center', cellClassName: 'column-border' }
  ];

  const detailCodeColumns = [
    { field: 'codeId', headerName: '코드ID', flex: 1, headerAlign: 'center', align:'center' },
    { field: 'codeDetailId', headerName: '코드상세ID', flex: 1, headerAlign: 'center' },
    { field: 'codeDetailNm', headerName: '코드상세명', flex: 1, headerAlign: 'center' },
    { field: 'description', headerName: '설명', flex: 1, headerAlign: 'center' },
    { field: 'orderNo', headerName: '정렬순서', flex: 1, headerAlign: 'center' },
    { field: 'useYn', headerName: '사용여부', flex: 1, headerAlign: 'center' },
    { field: 'createDt', headerName: '생성일자', flex: 1, headerAlign: 'center' },
    { field: 'createId', headerName: '생성자', flex: 1, headerAlign: 'center' },
    { field: 'updateDt', headerName: '변경일자', flex: 1, headerAlign: 'center' },
    { field: 'updateId', headerName: '변경자', flex: 1, headerAlign: 'center' }
  ];

  const attrColumns = [
    { field: 'codeAttrId', headerName: '속성ID', flex: 1, headerAlign: 'center' },
    { field: 'codeId', headerName: '상세ID', flex: 1, headerAlign: 'center' },
    { field: 'attr1', headerName: '속성1', flex: 1, headerAlign: 'center' },
    { field: 'attr2', headerName: '속성2', flex: 1, headerAlign: 'center' },
    { field: 'attr3', headerName: '속성3', flex: 1, headerAlign: 'center' },
    { field: 'useYn', headerName: '사용여부', flex: 1, headerAlign: 'center' },
    { field: 'createDt', headerName: '생성일자', flex: 1, headerAlign: 'center' },
    { field: 'createId', headerName: '생성자', flex: 1, headerAlign: 'center' },
    { field: 'updateDt', headerName: '변경일자', flex: 1, headerAlign: 'center' },
    { field: 'updateId', headerName: '변경자', flex: 1, headerAlign: 'center' }
  ];

  return (
    <Box>
      <Typography variant="h5" gutterBottom>공통 코드 관리</Typography>

      {/* 코드 그룹 */}
      <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
        <Typography variant="subtitle1" gutterBottom>코드 그룹</Typography>
        <Box sx={{ height: 350 }}>
          <DataGrid
            rows={commonCodes}
            columns={commonCodeColumns}
            getRowId={(row) => row.codeId}
            height='300'
            hideFooterSelectedRowCount
            sx={{
              border: 1,
              borderColor: 'divider',
              '& .MuiDataGrid-columnHeaders': {
                borderBottom: '1px solid #ccc',
                backgroundColor: '#fafafa'
              },
              '& .MuiDataGrid-cell': {
                borderBottom: '1px solid #eee'
              },
              '& .column-border': {
                borderRight: '1px solid #ddd'
              }
            }}
          />
        </Box>
      </Paper>

      {/* 상세/속성 탭 */}
      <Paper elevation={3} sx={{ p: 2 }}>
        <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ mb: 2 }}>
          <Tab label="상세 코드" />
          <Tab label="코드 속성" />
        </Tabs>

        <Box sx={{ height: 350 }}>
          {tab === 0 && (
            <DataGrid
              rows={detailCodes}
              columns={detailCodeColumns}
              getRowId={(row) => row.codeDetailId}
              height='300'
              hideFooterSelectedRowCount
              sx={{
                border: 1,
                borderColor: 'divider',
                '& .MuiDataGrid-columnHeaders': {
                  borderBottom: '1px solid #ccc',
                  backgroundColor: '#fafafa'
                },
                '& .MuiDataGrid-cell': {
                  borderBottom: '1px solid #eee'
                },
                '& .column-border': {
                borderRight: '1px solid #ddd'
                }
              }}
            />
          )}
          {tab === 1 && (
            <DataGrid
              rows={attrCodes}
              columns={attrColumns}
              getRowId={(row) => row.codeId + '-' + row.attr1}
              autoHeight
              hideFooterSelectedRowCount
              sx={{
                border: 1,
                borderColor: 'divider',
                '& .MuiDataGrid-columnHeaders': {
                  borderBottom: '1px solid #ccc',
                  backgroundColor: '#fafafa'
                },
                '& .MuiDataGrid-cell': {
                  borderBottom: '1px solid #eee'
                },
                '& .column-border': {
                borderRight: '1px solid #ddd'
                }
              }}
            />
          )}
        </Box>
      </Paper>
    </Box>
  );
}