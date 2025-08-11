package com.loccar.performance.controller;

import com.loccar.performance.service.PerformanceIndicatorsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/performance-indicators")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class PerformanceIndicatorsController {

    private final PerformanceIndicatorsService indicatorsService;

    @GetMapping
    public ResponseEntity<Map<String, Object>> getIndicators() {
        return ResponseEntity.ok(indicatorsService.getIndicators());
    }
}