//  引入request
import request from "../../utils/request";



// 测试 post请求 /meeting/selMeetUsageByTime
export const list = (data) => request.post('list.php', data,{ 'Authorization': localStorage.getItem('token'),'content-type': 'application/json' })




// 公共课管理
// 查询
export const inquireManagement = (data) => request.post('publicClassManagement/inquireManagement.php', data,{ 'Authorization': localStorage.getItem('token'),'content-type': 'application/json' })
// 新增
export const addManage = (data) => request.post('/publicClassManagement/addManage.php', data,{ 'Authorization': localStorage.getItem('token'),'content-type': 'application/json' })
// 编辑
export const editManage = (data) => request.post('/publicClassManagement/editManage.php', data,{ 'Authorization': localStorage.getItem('token'),'content-type': 'application/json' })
// 删除
export const deleteManage = (data) => request.post('/publicClassManagement/deleteManage.php', data,{ 'Authorization': localStorage.getItem('token'),'content-type': 'application/json' })
// 签到
export const signIn = (data) => request.post('/publicClassManagement/signIn.php', data,{ 'Authorization': localStorage.getItem('token'),'content-type': 'application/json' })


// 考勤管理
// 查询
export const inquireAttendance = (data) => request.post('attendanceManagement/inquireAttendance.php', data,{ 'Authorization': localStorage.getItem('token'),'content-type': 'application/json' })


// 统计分析
// 查询
export const inquireStatisticalAnalysis = (data) => request.post('statisticalAnalysis/inquireStatisticalAnalysis.php', data,{ 'Authorization': localStorage.getItem('token'),'content-type': 'application/json' })
// 新增
export const addStatisticalAnalysis = (data) => request.post('/statisticalAnalysis/addStatisticalAnalysis.php', data,{ 'Authorization': localStorage.getItem('token'),'content-type': 'application/json' })
// 编辑
export const editStatisticalAnalysis = (data) => request.post('/statisticalAnalysis/editStatisticalAnalysis.php', data,{ 'Authorization': localStorage.getItem('token'),'content-type': 'application/json' })
// 删除
export const deleteStatisticalAnalysis = (data) => request.post('/statisticalAnalysis/deleteStatisticalAnalysis.php', data,{ 'Authorization': localStorage.getItem('token'),'content-type': 'application/json' })


// 个人中心
export const inquirePersonalCenter = (data) => request.post('personalCenter/inquirePersonalCenter.php', data,{ 'Authorization': localStorage.getItem('token'),'content-type': 'application/json' })

