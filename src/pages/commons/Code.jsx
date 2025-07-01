import { useEffect, useState } from 'react';
import { Box, Paper, Tab, Tabs, Typography, Stack, Button, Select, MenuItem } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import api from '@utils/axios'; 
import { useSelector } from 'react-redux';

export default function CodeManagement() {
  const [tab, setTab] = useState(0);
  const [commonCodes, setCommonCodes] = useState([]);
  const [detailCodes, setDetailCodes] = useState([]);
  const [attrCodes, setAttrCodes] = useState([]);

  const user = useSelector((state) => state.user.userId);

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
    { field: 'codeId', headerName: '코드ID', flex: 1, headerAlign: 'center', align:'center', cellClassName: 'column-border', editable: true },
    { field: 'codeNm', headerName: '코드명', flex: 1, headerAlign: 'center', align:'left', cellClassName: 'column-border', editable: true },
    { field: 'description', headerName: '설명', flex: 1, headerAlign: 'center', align:'left', cellClassName: 'column-border', editable: true },
    { field: 'useYn', 
      headerName: '사용여부', 
      flex: 1, headerAlign: 'center', 
      align:'center', cellClassName: 'column-border', 
      editable: true,
      renderEditCell: (params) => {
        return (
        <Select
          value={params.value}
          onChange={(e) => {
            params.api.setEditCellValue({
              id: params.id,
              field: params.field,
              value: e.target.value,
            });
          }}
          sx={{ width: '100%' }}
        >
          <MenuItem value="Y">Y</MenuItem>
          <MenuItem value="N">N</MenuItem>
        </Select>
      );
      }
    },
    { field: 'createDt', headerName: '생성일자', flex: 1, headerAlign: 'center', align:'left', cellClassName: 'column-border' },
    { field: 'createId', headerName: '생성자', flex: 1, headerAlign: 'center', align:'center', cellClassName: 'column-border' },
    { field: 'updateDt', headerName: '변경일자', flex: 1, headerAlign: 'center', align:'left', cellClassName: 'column-border' },
    { field: 'updateId', headerName: '변경자', flex: 1, headerAlign: 'center', align:'center', cellClassName: 'column-border' }
  ];

  const detailCodeColumns = [
    { field: 'codeId', headerName: '코드ID', flex: 1, headerAlign: 'center', align:'center', cellClassName: 'column-border' },
    { field: 'codeDetailId', headerName: '코드상세ID', flex: 1, headerAlign: 'center', cellClassName: 'column-border' },
    { field: 'codeDetailNm', headerName: '코드상세명', flex: 1, headerAlign: 'center', cellClassName: 'column-border' },
    { field: 'description', headerName: '설명', flex: 1, headerAlign: 'center', cellClassName: 'column-border' },
    { field: 'orderNo', headerName: '정렬순서', flex: 1, headerAlign: 'center', cellClassName: 'column-border' },
    { field: 'useYn', headerName: '사용여부', flex: 1, headerAlign: 'center', cellClassName: 'column-border' },
    { field: 'createDt', headerName: '생성일자', flex: 1, headerAlign: 'center', cellClassName: 'column-border' },
    { field: 'createId', headerName: '생성자', flex: 1, headerAlign: 'center', cellClassName: 'column-border' },
    { field: 'updateDt', headerName: '변경일자', flex: 1, headerAlign: 'center', cellClassName: 'column-border' },
    { field: 'updateId', headerName: '변경자', flex: 1, headerAlign: 'center', cellClassName: 'column-border' }
  ];

  const attrColumns = [
    { field: 'codeAttrId', headerName: '속성ID', flex: 1, headerAlign: 'center', cellClassName: 'column-border' },
    { field: 'codeId', headerName: '상세ID', flex: 1, headerAlign: 'center', cellClassName: 'column-border' },
    { field: 'attr1', headerName: '속성1', flex: 1, headerAlign: 'center', cellClassName: 'column-border' },
    { field: 'attr2', headerName: '속성2', flex: 1, headerAlign: 'center', cellClassName: 'column-border' },
    { field: 'attr3', headerName: '속성3', flex: 1, headerAlign: 'center', cellClassName: 'column-border' },
    { field: 'useYn', headerName: '사용여부', flex: 1, headerAlign: 'center', cellClassName: 'column-border' },
    { field: 'createDt', headerName: '생성일자', flex: 1, headerAlign: 'center', cellClassName: 'column-border' },
    { field: 'createId', headerName: '생성자', flex: 1, headerAlign: 'center', cellClassName: 'column-border' },
    { field: 'updateDt', headerName: '변경일자', flex: 1, headerAlign: 'center', cellClassName: 'column-border' },
    { field: 'updateId', headerName: '변경자', flex: 1, headerAlign: 'center', cellClassName: 'column-border' }
  ];

  // 공통코드 그룹 중복검사 체크
  const isDuplicateCodeId = (rows) => {
    const ids = commonCodes.map(row => row.codeId?.trim()).filter(Boolean);
    const unique = new Set(ids);
    return unique.size !== ids.length;
  };

  const handleRowUpdate = (newRow) => {
    const updated = commonCodes.map((row) =>
      row.id === newRow.id ? newRow : row
    );

    if (isDuplicateCodeId(updated)) {
      alert('중복된 코드ID가 있습니다!');
      throw new Error('Duplicate codeId');
    }

    setCommonCodes(updated);
    return newRow;
  };

  const addCommonCode = () => {
    const newCode = {
      id: Date.now(),
      codeId: '',
      codeNm: '',
      description: '',
      useYn: 'Y'
    };
    setCommonCodes((prev) => [...prev, newCode]);
  };

  const saveCommonCode = async () => {
    try {
      const invalid = commonCodes.some(row => !row.codeId?.trim());

      // codeId 빈값 체크
      if (invalid) {
        alert('코드ID는 필수입니다.');
        return;
      }

      if (isDuplicateCodeId()) {
        alert('중복된 코드ID가 있습니다!');
        return;
      }

      const saveData = commonCodes.map(row => ({
        ...row,
        createId: user,
        updateId: user
      }));
      await api.post('/code/save', saveData);

      alert('저장 성공!');
      fetchCommonCodes();

    } catch (e) {
      console.error(e);
      alert('저장 실패!');
    }
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>공통 코드 관리</Typography>

      {/* 버튼 영역 */}
      <Stack direction="row" spacing={2} mb={2} justifyContent="flex-end">
        <Button variant="contained" onClick={addCommonCode} sx={{ bgcolor: '#007bff' }}>추가</Button>
        <Button variant="contained" /*</Stack>onClick={editCommonCode}*/ sx={{ bgcolor: '#007bff' }}>수정</Button>
        <Button variant="contained" /*onClick={deleteCommonCode}*/ sx={{ bgcolor: '#ff4d4f' }}>삭제</Button>
        <Button variant="contained" onClick={saveCommonCode} sx={{ bgcolor: '#52c41a' }}>저장</Button>
      </Stack>

      {/* 코드 그룹 */}
      <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
        <Typography variant="subtitle1" gutterBottom>코드 그룹</Typography>
        <Box sx={{ height: 350 }}>
          <DataGrid
            rows={commonCodes}
            columns={commonCodeColumns}
            getRowId={(row) => row.id}
            processRowUpdate={handleRowUpdate}
            experimentalFeatures={{ newEditingApi: true }}
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