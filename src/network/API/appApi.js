//  引入request
import request from "../../utils/request";



// 测试 post请求 /meeting/selMeetUsageByTime
export const list = (data) => request.post('list.php', data,{ 'Authorization': localStorage.getItem('token'),'content-type': 'application/json' })




// 公共课管理
export const inquireManagement = (data) => request.post('publicClassManagement/inquireManagement.php', data,{ 'Authorization': localStorage.getItem('token'),'content-type': 'application/json' })

// 考勤管理
export const inquireAttendance = (data) => request.post('attendanceManagement/inquireAttendance.php', data,{ 'Authorization': localStorage.getItem('token'),'content-type': 'application/json' })

// 统计分析
export const inquireStatisticalAnalysis = (data) => request.post('statisticalAnalysis/inquireStatisticalAnalysis.php', data,{ 'Authorization': localStorage.getItem('token'),'content-type': 'application/json' })

// 个人中心
export const inquirePersonalCenter = (data) => request.post('personalCenter/inquirePersonalCenter.php', data,{ 'Authorization': localStorage.getItem('token'),'content-type': 'application/json' })

