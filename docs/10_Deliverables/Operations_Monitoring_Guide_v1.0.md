# OPERATIONS & MONITORING GUIDE
# FIVESTAR PAYMENTS ENGINE

<div align="center">

![1CloudHub Logo](https://www.1cloudhub.com/wp-content/uploads/2020/01/1CloudHub-Logo-horiz-hires-RGB-copy-1.jpg)
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
![Fivestar Logo](https://fivestargroup.in/storage/2023/04/fivestart-logo-1.png)

**Operations & Monitoring Strategy**

</div>

---

## Document Information

| **Field** | **Details** |
|-----------|-------------|
| **Document Title** | Operations & Monitoring Guide |
| **Project Name** | Fivestar Payments Engine Modernization |
| **Client** | Fivestar Business Finance |
| **Prepared By** | 1CloudHub DevOps Team |
| **Document Version** | v1.0 |
| **Date** | 03-June-2025 |
| **Document Type** | Operations Guide |
| **Classification** | Confidential |

---

## ⚠️ DOCUMENT APPROVAL STATUS

**CURRENT STATUS:** 🔴 **PENDING FIVESTAR APPROVAL**

This document is currently in draft status and awaiting formal review and approval from Fivestar stakeholders. No operational procedures should be implemented until proper approvals are received.

### Required Approvals
- **Technical Review:** Sridharan Vembu (Engineering Head) - 🔴 **PENDING**
- **Operations Review:** Azharuddin Nurul (Project Owner) - 🔴 **PENDING**
- **Executive Sign-off:** Vanamali Sridharan (Executive Sponsor) - 🔴 **PENDING**

### 1CloudHub Internal Approvals
- **Solution Architect:** Preeth M - ✅ **APPROVED** (June 3, 2025)
- **Executive Sponsor:** Ramakrishna Phani - ✅ **APPROVED** (June 3, 2025)
- **Project Manager:** Vinod Ramanathan - ✅ **APPROVED** (June 3, 2025)

---

## Approval & Sign-off

| **Role** | **Name** | **Organization** | **Status** | **Date** |
|----------|----------|------------------|------------|----------|
| **Engineering Head** | Sridharan Vembu | Fivestar | 🔴 *Pending Review* | |
| **Project Owner** | Azharuddin Nurul | Fivestar | 🔴 *Pending Review* | |
| **Executive Sponsor** | Vanamali Sridharan | Fivestar | 🔴 *Pending Review* | |
| **Solution Architect** | Preeth M | 1CloudHub | ✅ *Approved* | June 3, 2025 |
| **Executive Sponsor** | Ramakrishna Phani | 1CloudHub | ✅ *Approved* | June 3, 2025 |
| **Project Manager** | Vinod Ramanathan | 1CloudHub | ✅ *Approved* | June 3, 2025 |

---

## TABLE OF CONTENTS

1. [Introduction](#1-introduction)
2. [Monitoring Architecture](#2-monitoring-architecture)
3. [AWS CloudWatch Configuration](#3-aws-cloudwatch-configuration)
4. [Grafana & Prometheus Setup](#4-grafana--prometheus-setup)
5. [Alert Management](#5-alert-management)
6. [Performance Monitoring](#6-performance-monitoring)
7. [Security Monitoring](#7-security-monitoring)
8. [Database Monitoring](#8-database-monitoring)
9. [Application Monitoring](#9-application-monitoring)
10. [Operational Dashboards](#10-operational-dashboards)
11. [Incident Response](#11-incident-response)
12. [Maintenance Procedures](#12-maintenance-procedures)
13. [Troubleshooting Guide](#13-troubleshooting-guide)

---

## 1. Introduction

### 1.1 Purpose

This Operations & Monitoring Guide provides comprehensive procedures for monitoring, maintaining, and operating the Fivestar Payments Engine system. It covers monitoring setup, alerting strategies, incident response, and maintenance procedures.

### 1.2 Monitoring Strategy

**Integrated Monitoring Approach:**
- **AWS CloudWatch**: Core AWS service monitoring and logging
- **Grafana**: Advanced visualization and custom dashboards
- **Prometheus**: Metrics collection and alerting
- **Standard Escalation**: Email → Slack → PagerDuty

### 1.3 Key Operational Principles

| Principle | Implementation | Rationale |
|-----------|---------------|-----------|
| Observability | Comprehensive metrics, logs, and traces | Proactive issue detection |
| Automation | Automated alerts and remediation | Reduce manual intervention |
| Role-Based Access | RBAC-aligned dashboard access | Security and responsibility alignment |
| 90-Day Retention | Standard log retention period | Compliance and analysis needs |

---

## 2. Monitoring Architecture

### 2.1 Monitoring Stack Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    MONITORING ARCHITECTURE                  │
├─────────────────────────────────────────────────────────────┤
│  Visualization Layer                                        │
│  ┌─────────────────┐    ┌─────────────────┐                │
│  │    Grafana      │    │  CloudWatch     │                │
│  │   Dashboards    │    │   Dashboards    │                │
│  └─────────────────┘    └─────────────────┘                │
├─────────────────────────────────────────────────────────────┤
│  Metrics & Alerting Layer                                   │
│  ┌─────────────────┐    ┌─────────────────┐                │
│  │   Prometheus    │    │   CloudWatch    │                │
│  │    Metrics      │    │     Alarms      │                │
│  └─────────────────┘    └─────────────────┘                │
├─────────────────────────────────────────────────────────────┤
│  Collection Layer                                           │
│  ┌─────────────────┐    ┌─────────────────┐                │
│  │ Application     │    │   AWS Services  │                │
│  │   Metrics       │    │    Metrics      │                │
│  └─────────────────┘    └─────────────────┘                │
├─────────────────────────────────────────────────────────────┤
│  Data Sources                                               │
│  ┌───────┐ ┌───────┐ ┌───────┐ ┌───────┐ ┌───────┐       │
│  │  ECS  │ │  RDS  │ │DynamoDB│ │Lambda │ │  ALB  │       │
│  └───────┘ └───────┘ └───────┘ └───────┘ └───────┘       │
└─────────────────────────────────────────────────────────────┘
```

### 2.2 Dashboard Access Control

#### 2.2.1 Role-Based Dashboard Access

```yaml
AccessMatrix:
  SuperAdmin:
    Dashboards:
      - All system dashboards
      - Security monitoring
      - Infrastructure health
      - Business metrics
      - Admin operations
    Permissions: Full access, edit, create, delete
    
  Admin:
    Dashboards:
      - System health dashboards
      - Application performance
      - Business metrics
      - Operational alerts
    Permissions: View, edit existing dashboards
    
  BranchManager:
    Dashboards:
      - Branch-specific metrics
      - Collection performance
      - Payment processing status
      - Daily reconciliation reports
    Permissions: View only, branch-filtered data
    
  FinanceTeam:
    Dashboards:
      - Payment analytics
      - Revenue metrics
      - Reconciliation reports
      - Exception reports
    Permissions: View only, financial data focus
    
  FieldOfficer:
    Dashboards:
      - Personal collection metrics
      - Mobile app performance
      - Customer payment status
    Permissions: View only, user-specific data
    
  Viewer:
    Dashboards:
      - System status overview
      - Basic performance metrics
    Permissions: View only, limited access
```

---

## 3. AWS CloudWatch Configuration

### 3.1 Log Groups Configuration

#### 3.1.1 Application Log Groups (90-Day Retention)

```yaml
LogGroups:
  InternalPE:
    Name: '/ecs/fivestar-internal-pe'
    RetentionDays: 90
    KMSEncryption: true
    
  CustomerPortal:
    Name: '/ecs/fivestar-customer-portal'
    RetentionDays: 90
    KMSEncryption: true
    
  ScheduledJobs:
    Name: '/aws/lambda/fivestar-schedulers'
    RetentionDays: 90
    KMSEncryption: true
    
  DatabaseLogs:
    Name: '/aws/rds/instance/fivestar-payments-db/postgresql'
    RetentionDays: 90
    KMSEncryption: true
    
  SecurityLogs:
    Name: '/aws/security/fivestar-payments'
    RetentionDays: 90
    KMSEncryption: true
```

### 3.2 CloudWatch Alarms

#### 3.2.1 Critical System Alarms

```yaml
HighErrorRate:
  AlarmName: Fivestar-High-Error-Rate
  MetricName: ErrorRate
  Namespace: Fivestar/Application
  Statistic: Average
  Period: 300
  EvaluationPeriods: 2
  Threshold: 5
  ComparisonOperator: GreaterThanThreshold
  AlarmActions:
    - Email: devops-team@1cloudhub.com
    - Slack: #fivestar-alerts
    - PagerDuty: critical-escalation

LowPaymentSuccessRate:
  AlarmName: Fivestar-Low-Payment-Success-Rate
  MetricName: PaymentSuccessRate
  Namespace: Fivestar/Payments
  Statistic: Average
  Period: 300
  EvaluationPeriods: 2
  Threshold: 95
  ComparisonOperator: LessThanThreshold
  AlarmActions:
    - Email: payments-team@1cloudhub.com
    - Slack: #payments-alerts
```

---

## 4. Grafana & Prometheus Setup

### 4.1 Prometheus Configuration

#### 4.1.1 Metrics Collection

```yaml
# prometheus/prometheus.yml
global:
  scrape_interval: 15s
  evaluation_interval: 15s
  external_labels:
    environment: 'production'
    region: 'ap-south-1'

scrape_configs:
  - job_name: 'fivestar-internal-pe'
    ec2_sd_configs:
      - region: ap-south-1
        port: 8080
    relabel_configs:
      - source_labels: [__meta_ec2_tag_Service]
        target_label: service
      - source_labels: [__meta_ec2_tag_Environment]
        target_label: environment

  - job_name: 'fivestar-customer-portal'
    ec2_sd_configs:
      - region: ap-south-1
        port: 80
    relabel_configs:
      - source_labels: [__meta_ec2_tag_Service]
        target_label: service
```

### 4.2 Grafana Dashboard Configuration

#### 4.2.1 Business Metrics Dashboard

```json
{
  "dashboard": {
    "title": "Fivestar Payments - Business Metrics",
    "tags": ["fivestar", "business", "payments"],
    "panels": [
      {
        "title": "Payment Success Rate",
        "type": "stat",
        "targets": [
          {
            "expr": "sum(rate(payments_total{status=\"success\"}[5m])) / sum(rate(payments_total[5m])) * 100",
            "legendFormat": "Success Rate %"
          }
        ],
        "fieldConfig": {
          "defaults": {
            "color": {
              "mode": "thresholds"
            },
            "thresholds": {
              "steps": [
                {"color": "red", "value": 0},
                {"color": "yellow", "value": 95},
                {"color": "green", "value": 99}
              ]
            }
          }
        }
      },
      {
        "title": "Payment Volume by Channel",
        "type": "piechart",
        "targets": [
          {
            "expr": "sum(rate(payments_total[5m])) by (channel)",
            "legendFormat": "{{channel}}"
          }
        ]
      },
      {
        "title": "Daily Revenue Trend",
        "type": "graph",
        "targets": [
          {
            "expr": "sum(increase(payment_amount_total[1d]))",
            "legendFormat": "Daily Revenue"
          }
        ]
      }
    ]
  }
}
```

---

## 5. Alert Management

### 5.1 Alert Escalation Framework

#### 5.1.1 Standard Escalation: Email → Slack → PagerDuty

```yaml
EscalationMatrix:
  Level1_Email:
    Timeframe: 0-5 minutes
    Recipients:
      - devops-team@1cloudhub.com
      - app-team@1cloudhub.com
    Method: Email notification
    
  Level2_Slack:
    Timeframe: 5-15 minutes (if not acknowledged)
    Recipients:
      - #fivestar-alerts (Slack channel)
      - @devops-oncall (Slack user)
    Method: Slack notification with @channel
    
  Level3_PagerDuty:
    Timeframe: 15+ minutes (if not resolved)
    Recipients:
      - DevOps Engineer (on-call)
      - Engineering Manager
    Method: PagerDuty incident creation
    
  Level4_Executive:
    Timeframe: 30+ minutes (critical only)
    Recipients:
      - CTO
      - VP Engineering
    Method: Phone + Email + Slack DM
```

### 5.2 Alert Configuration

#### 5.2.1 Critical Alerts

```yaml
CriticalAlerts:
  SystemDown:
    Trigger: Health check failures > 3 consecutive
    Escalation: Immediate PagerDuty
    Impact: Complete service unavailability
    
  PaymentProcessingFailed:
    Trigger: Payment success rate < 90%
    Escalation: Email → Slack → PagerDuty
    Impact: Revenue loss, customer dissatisfaction
    
  DatabaseUnavailable:
    Trigger: Database connection failures > 5
    Escalation: Immediate PagerDuty
    Impact: Complete system dysfunction
    
  SecurityBreach:
    Trigger: GuardDuty HIGH severity findings
    Escalation: Immediate executive notification
    Impact: Data security, compliance violation
```

---

## 6. Performance Monitoring

### 6.1 Application Performance Metrics

#### 6.1.1 Key Performance Indicators (KPIs)

```yaml
BusinessKPIs:
  PaymentSuccessRate:
    Target: ">= 99%"
    Warning: "< 98%"
    Critical: "< 95%"
    
  AveragePaymentProcessingTime:
    Target: "< 3 seconds"
    Warning: "< 5 seconds"
    Critical: "> 10 seconds"
    
  APIResponseTime:
    Target: "< 500ms (95th percentile)"
    Warning: "< 1 second"
    Critical: "> 2 seconds"
    
  SystemAvailability:
    Target: ">= 99.9%"
    Warning: ">= 99.5%"
    Critical: "< 99%"

TechnicalKPIs:
  CPUUtilization:
    Target: "< 70%"
    Warning: "< 80%"
    Critical: "> 90%"
    
  MemoryUtilization:
    Target: "< 75%"
    Warning: "< 85%"
    Critical: "> 95%"
    
  DatabaseConnections:
    Target: "< 60%"
    Warning: "< 80%"
    Critical: "> 95%"
```

---

## 7. Security Monitoring

### 7.1 Security Metrics and Alerts

#### 7.1.1 Authentication Monitoring

```yaml
AuthenticationMetrics:
  FailedLoginAttempts:
    Threshold: 5 failures in 1 minute
    Action: Temporary IP block
    Notification: Security team
    
  SuspiciousLoginPatterns:
    Indicators:
      - Multiple failed attempts from same IP
      - Login from unusual geographic location
      - Login outside business hours
    Action: Enhanced monitoring + notification
    
  PrivilegeEscalation:
    Indicators:
      - Admin role assignment outside approval process
      - Unauthorized access to sensitive data
    Action: Immediate security team notification
```

---

## 8. Database Monitoring

### 8.1 PostgreSQL (RDS) Monitoring

#### 8.1.1 Database Performance Metrics

```yaml
RDSMetrics:
  ConnectionMetrics:
    - DatabaseConnections (Current: 160/200 max)
    - ConnectionCount
    - MaxConnections
    
  PerformanceMetrics:
    - CPUUtilization (Target: <70%)
    - FreeableMemory (Alert: <1GB)
    - ReadLatency (Target: <10ms)
    - WriteLatency (Target: <20ms)
    - IOPS (Monitor for sustained high usage)
    
  StorageMetrics:
    - FreeStorageSpace (Alert: <20%)
    - DiskQueueDepth (Target: <10)
    
DatabaseAlerts:
  HighConnections:
    Threshold: 160 connections (80% of max)
    Action: Scale up or investigate connection leaks
    
  HighCPU:
    Threshold: 80% for 5 minutes
    Action: Investigate slow queries
    
  LowFreeStorage:
    Threshold: <20% free space
    Action: Storage expansion planning
```

### 8.2 DynamoDB Monitoring

#### 8.2.1 DynamoDB Performance Metrics

```yaml
DynamoDBMetrics:
  ThroughputMetrics:
    - ConsumedReadCapacityUnits
    - ConsumedWriteCapacityUnits
    - ThrottledRequests
    
  LatencyMetrics:
    - SuccessfulRequestLatency
    - ItemCount
    - TableSize
    
DynamoDBAlerts:
  Throttling:
    Threshold: Any throttling events
    Action: Investigate and potentially increase capacity
    
  HighLatency:
    Threshold: >100ms average latency
    Action: Investigate query patterns and indexes
```

---

## 9. Application Monitoring

### 9.1 Internal Payments Engine Monitoring

#### 9.1.1 Business Logic Monitoring

```yaml
PaymentProcessingMetrics:
  CashCollections:
    - Field collection success rate
    - OTP verification success rate
    - Branch confirmation timeliness
    
  DigitalPayments:
    - RazorPay integration success rate
    - QR code payment processing
    - BBPS transaction success
    
  MandateManagement:
    - UPI AutoPay registration success
    - NACH mandate creation success
    - Auto-debit execution success
    
  LMSIntegration:
    - Receipt posting success rate
    - Queue depth during LMS downtime
    - Retry mechanism effectiveness
```

### 9.2 Customer Payment Portal Monitoring

#### 9.2.1 Customer Experience Metrics

```yaml
CustomerPortalMetrics:
  UserJourney:
    - Loan number validation success rate
    - Payment completion rate
    - Error rates by step
    
  Performance:
    - Page load times
    - API response times
    - Payment gateway latency
    
  Security:
    - Failed authentication attempts
    - Suspicious activity patterns
    - Rate limiting effectiveness
```

---

## 10. Operational Dashboards

### 10.1 Executive Dashboard

#### 10.1.1 High-Level Business Metrics

```yaml
ExecutiveDashboard:
  Widgets:
    - Daily Revenue (Current vs Target)
    - Payment Success Rate (99.2%)
    - System Availability (99.95%)
    - Customer Satisfaction Score
    - Active Critical Issues (0)
    
  TimeRange: Last 24 hours, 7 days, 30 days
  RefreshRate: 5 minutes
  Access: C-level executives, VPs
```

### 10.2 Operations Dashboard

#### 10.2.1 System Health Overview

```yaml
OperationsDashboard:
  Sections:
    SystemHealth:
      - ECS service status
      - Database health
      - Queue depths
      - Active alerts
      
    Performance:
      - Response times
      - Throughput
      - Error rates
      - Resource utilization
      
    Business:
      - Payment volumes
      - Success rates by channel
      - Processing times
      - Revenue metrics
      
  RefreshRate: 30 seconds
  Access: DevOps team, Application team, Managers
```

### 10.3 Branch Operations Dashboard

#### 10.3.1 Branch-Specific Metrics

```yaml
BranchDashboard:
  BranchFilter: Dynamic based on user login
  Metrics:
    - Daily collection targets vs actuals
    - Field officer performance
    - Pending reconciliations
    - Exception reports
    - Payment method breakdown
    
  Alerts:
    - Overdue reconciliations
    - Failed LMS postings
    - High exception rates
    
  Access: Branch managers, Cashiers, Field officers
```

---

## 11. Incident Response

### 11.1 Incident Classification

#### 11.1.1 Severity Levels

```yaml
Severity1_Critical:
  Definition: Complete service outage or data loss
  Examples:
    - Payment system completely down
    - Database corruption/unavailability
    - Security breach with data exposure
  ResponseTime: 15 minutes
  Escalation: Immediate executive notification
  
Severity2_High:
  Definition: Major functionality impaired
  Examples:
    - Payment success rate below 90%
    - Single payment channel failure
    - Performance severely degraded
  ResponseTime: 1 hour
  Escalation: Management notification within 2 hours
  
Severity3_Medium:
  Definition: Minor functionality impaired
  Examples:
    - Individual component failure with workaround
    - Performance slightly degraded
    - Non-critical integration issues
  ResponseTime: 4 hours
  Escalation: Standard team notification
  
Severity4_Low:
  Definition: Cosmetic issues or minor inconveniences
  Examples:
    - UI display issues
    - Documentation updates needed
    - Minor configuration changes
  ResponseTime: Next business day
  Escalation: Team lead notification
```

### 11.2 Incident Response Procedures

#### 11.2.1 Response Workflow

```yaml
ImmediateResponse:
  Step1: Acknowledge alert within 15 minutes
  Step2: Assess severity and impact
  Step3: Notify appropriate stakeholders
  Step4: Begin initial investigation
  Step5: Implement immediate mitigation if possible
  
Investigation:
  Step1: Gather relevant logs and metrics
  Step2: Identify root cause
  Step3: Develop remediation plan
  Step4: Communicate status updates every 30 minutes
  
Resolution:
  Step1: Implement fix/workaround
  Step2: Verify system restoration
  Step3: Monitor for stability
  Step4: Document incident and lessons learned
  
PostIncident:
  Step1: Conduct post-mortem within 48 hours
  Step2: Identify preventive measures
  Step3: Update monitoring and alerting
  Step4: Share learnings with team
```

### 11.3 Communication Templates

#### 11.3.1 Incident Notification Templates

```yaml
InitialNotification:
  Subject: "[INCIDENT] Fivestar Payments - {{Severity}} - {{Brief Description}}"
  Body: |
    Incident Details:
    - Severity: {{Severity}}
    - Start Time: {{StartTime}}
    - Affected Services: {{AffectedServices}}
    - Current Status: {{Status}}
    - Estimated Resolution: {{ETA}}
    - Incident Commander: {{Commander}}
    
    We are actively investigating and will provide updates every 30 minutes.

StatusUpdate:
  Subject: "[UPDATE] Fivestar Payments Incident - {{IncidentID}}"
  Body: |
    Update #{{UpdateNumber}} - {{Timestamp}}
    
    Current Status: {{CurrentStatus}}
    Actions Taken: {{ActionsTaken}}
    Next Steps: {{NextSteps}}
    ETA: {{UpdatedETA}}

ResolutionNotification:
  Subject: "[RESOLVED] Fivestar Payments Incident - {{IncidentID}}"
  Body: |
    The incident has been resolved at {{ResolutionTime}}.
    
    Root Cause: {{RootCause}}
    Resolution: {{ResolutionSummary}}
    Duration: {{TotalDuration}}
    
    A detailed post-mortem will be conducted and shared within 48 hours.
```

---

## 12. Maintenance Procedures

### 12.1 Scheduled Maintenance

#### 12.1.1 Maintenance Windows

```yaml
MaintenanceSchedule:
  Regular:
    Frequency: Every 2nd Sunday of the month
    Time: 2:00 AM - 5:00 AM IST
    Duration: 3 hours maximum
    
  Emergency:
    Approval: Required from Engineering Manager
    Notification: 24 hours advance notice (if possible)
    
  Database:
    Frequency: Quarterly
    Time: During regular maintenance window
    Duration: 4 hours maximum
    Backup: Full backup before maintenance
```

#### 12.1.2 Pre-Maintenance Checklist

```yaml
PreMaintenanceChecklist:
  - [ ] Maintenance window scheduled and communicated
  - [ ] Change management approval obtained
  - [ ] Backup and rollback procedures verified
  - [ ] Monitoring temporarily adjusted
  - [ ] Customer notification sent (if applicable)
  - [ ] Emergency contacts available
  - [ ] Testing environment verified
  - [ ] Rollback criteria defined
```

### 12.2 System Updates

#### 12.2.1 Application Updates

```yaml
ApplicationUpdateProcess:
  Development:
    - Code changes reviewed and approved
    - Unit tests passed
    - Integration tests completed
    
  Staging:
    - Deployment to staging environment
    - Functional testing completed
    - Performance testing validated
    - Security scanning passed
    
  Production:
    - Phased deployment approach
    - Health checks monitored
    - Rollback ready if needed
    - Post-deployment validation
```

### 12.3 Database Maintenance

#### 12.3.1 PostgreSQL Maintenance

```yaml
DatabaseMaintenance:
  Weekly:
    - Vacuum analyze operations
    - Index usage analysis
    - Connection monitoring
    
  Monthly:
    - Performance tuning review
    - Storage utilization check
    - Backup integrity verification
    
  Quarterly:
    - Minor version updates
    - Configuration optimization
    - Capacity planning review
```

---

## 13. Troubleshooting Guide

### 13.1 Common Issues

#### 13.1.1 Payment Processing Issues

```yaml
PaymentFailures:
  Symptom: Low payment success rate
  Investigation:
    - Check external service status (RazorPay, JusPay)
    - Review payment gateway logs
    - Verify network connectivity
    - Check authentication tokens
  Resolution:
    - Restart failing services
    - Update expired credentials
    - Switch to backup payment gateway
    - Contact external service provider

LMSSyncFailures:
  Symptom: Transactions stuck in queue
  Investigation:
    - Check LMS connectivity
    - Review MuleSoft integration logs
    - Verify queue processing status
    - Check authentication
  Resolution:
    - Restart queue processing service
    - Clear stuck transactions
    - Manual transaction push
    - Escalate to LMS team
```

#### 13.1.2 Performance Issues

```yaml
HighResponseTimes:
  Symptom: API responses > 2 seconds
  Investigation:
    - Check database query performance
    - Review application logs for errors
    - Monitor CPU/memory utilization
    - Check external service latency
  Resolution:
    - Scale up application instances
    - Optimize slow database queries
    - Clear application caches
    - Review and optimize code

DatabasePerformance:
  Symptom: Slow database queries
  Investigation:
    - Review slow query log
    - Check database connection count
    - Monitor CPU and memory usage
    - Analyze query execution plans
  Resolution:
    - Add database indexes
    - Optimize query structure
    - Increase database instance size
    - Connection pool tuning
```

### 13.2 Diagnostic Commands

#### 13.2.1 AWS CLI Commands

```bash
# Check ECS service status
aws ecs describe-services \
  --cluster fivestar-payments \
  --services internal-pe-service \
  --region ap-south-1

# Check RDS instance status
aws rds describe-db-instances \
  --db-instance-identifier fivestar-payments-db \
  --region ap-south-1

# Check CloudWatch alarms
aws cloudwatch describe-alarms \
  --state-value ALARM \
  --region ap-south-1

# Get recent log events
aws logs tail /ecs/fivestar-internal-pe \
  --since 1h \
  --region ap-south-1
```

#### 13.2.2 Database Diagnostic Queries

```sql
-- Check active connections
SELECT count(*) as active_connections, 
       max_conn,
       max_conn - count(*) as available_connections
FROM pg_stat_activity 
CROSS JOIN (SELECT setting::int as max_conn FROM pg_settings WHERE name='max_connections') t;

-- Check slow queries
SELECT query, 
       mean_exec_time, 
       calls, 
       total_exec_time
FROM pg_stat_statements 
ORDER BY mean_exec_time DESC 
LIMIT 10;

-- Check database size
SELECT pg_size_pretty(pg_database_size('fivestar_payments')) as database_size;

-- Check table sizes
SELECT schemaname, tablename, 
       pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) as size
FROM pg_tables 
WHERE schemaname = 'fivestar'
ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;
```

### 13.3 Emergency Procedures

#### 13.3.1 Emergency Contacts

```yaml
EmergencyContacts:
  OnCallDevOps:
    Primary: +91-XXXX-XXXX-XX1
    Secondary: +91-XXXX-XXXX-XX2
    
  ApplicationTeam:
    Lead: +91-XXXX-XXXX-XX3
    Senior Developer: +91-XXXX-XXXX-XX4
    
  Management:
    Engineering Manager: +91-XXXX-XXXX-XX5
    CTO: +91-XXXX-XXXX-XX6
    
  External:
    AWS Support: Premium Support Case
    RazorPay Support: support@razorpay.com
    JusPay Support: support@juspay.in
```

#### 13.3.2 Emergency Escalation Matrix

```yaml
Escalation:
  Immediate:
    - System completely down
    - Data loss detected
    - Security breach confirmed
    Action: Call Engineering Manager immediately
    
  Within30Minutes:
    - Payment success rate < 80%
    - Multiple system failures
    - Performance severely degraded
    Action: Escalate to management if not resolved
    
  Within1Hour:
    - Single component failure
    - Performance issues
    - Integration failures
    Action: Standard escalation process
```

---

**Document Version**: 1.0  
**Last Updated**: June 03, 2025  
**Next Review**: September 03, 2025  
**Approved By**: DevOps Team Lead, 1CloudHub