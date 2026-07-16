package com.campusgpt.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DashboardStatsResponse {

    private long totalColleges;
    private long totalUsers;
    private long totalDocuments;
    private long totalChats;
    
    

    
    
}