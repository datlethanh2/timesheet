import axios from 'axios';


const axiosTv = axios.create({
    baseURL: 'http://dev-api-timesheet.nccsoft.vn/',
    headers: {
            'Content-Type': 'application/json', 
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjQwODk0IiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZSI6ImFkbWluIiwiQXNwTmV0LklkZW50aXR5LlNlY3VyaXR5U3RhbXAiOiI2OTU1MTJhZS0xZGNjLTUzYzMtM2ZjOC0zOWZmMjY1Y2ExYzgiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOlsiQWRtaW4iLCJQcm9qZWN0QWRtaW4iLCJCYXNpY1VzZXIiLCJTdXBlcnZpc29yIl0sInN1YiI6IjQwODk0IiwianRpIjoiNDc3Y2E4NWMtNGM3Zi00YjY1LWEwNDItYWEwYTEyNjY3NjZkIiwiaWF0IjoxNjY3ODcyNDY5LCJuYmYiOjE2Njc4NzI0NjksImV4cCI6MTY3NjUxMjQ2OSwiaXNzIjoiVGltZXNoZWV0IiwiYXVkIjoiVGltZXNoZWV0In0.1pPfFOQ211UTkXC8Y4RVg0fQVLb4FdaxLxhEDineo-E"
    }       
    
});

export default axiosTv;