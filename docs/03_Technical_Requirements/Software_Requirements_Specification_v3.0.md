# SOFTWARE REQUIREMENTS SPECIFICATIONS
# FIVESTAR – PAYMENTS ENGINE

<div align="center">

![1CloudHub Logo](https://www.1cloudhub.com/wp-content/uploads/2020/01/1CloudHub-Logo-horiz-hires-RGB-copy-1.jpg)
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
![Fivestar Logo](https://fivestargroup.in/storage/2023/04/fivestart-logo-1.png)

**Technical Requirements Documentation**

</div>

---

## Document Information

| **Field** | **Details** |
|-----------|-------------|
| **Document Title** | Software Requirements Specification |
| **Project Name** | Fivestar Payments Engine Modernization |
| **Client** | Fivestar Business Finance |
| **Prepared By** | 1CloudHub Technical Team |
| **Document Version** | v3.0 |
| **Date** | 03-June-2025 |
| **Document Type** | Technical Requirements |
| **Classification** | Confidential |

---

## ⚠️ DOCUMENT APPROVAL STATUS

**CURRENT STATUS:** 🔴 **PENDING FIVESTAR APPROVAL**

This document is currently in draft status and awaiting formal review and approval from Fivestar stakeholders. No implementation should proceed until proper approvals are received.

### Required Approvals
- **Technical Review:** Sridharan Vembu (Engineering Head) - 🔴 **PENDING**
- **Business Validation:** Azharuddin Nurul (Project Owner) - 🔴 **PENDING**
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

**Approval Status:** ![Status](https://img.shields.io/badge/Status-Under_Review-yellow)  
**GitHub Issue:** [Issue #2 - SRS v3.0 Technical Review](https://github.com/1cloudhub/fivestar-payments-engine/issues/2)  
**Sign-off Tracker:** [Link to tracker](../08_Customer_Approvals/SIGN_OFF_TRACKER.md)

---

## Revision History

| **Version** | **Date** | **Author** | **Changes** | **Approved By** |
|-------------|----------|------------|-------------|-----------------|
| v3.0 | June 3, 2025 | Ramakrishna Phani/Preeth M | Complete rewrite with dual system approach | *Under Review* |
| v2.0 | May 6, 2025 | Preeth M | Updated with integration requirements | Ramakrishna Phani |
| v1.0 | May 2, 2025 | Preeth M | Initial version | Ramakrishna Phani |

---

**DATE:** 03-June-2025  
**Authored By:** Ramakrishna Phani/Preeth M  
**Version:** 3.0  

## TABLE OF CONTENTS

1. [Introduction](#1-introduction)
2. [Overall Description](#2-overall-description)
3. [System Architecture](#3-system-architecture)
4. [Project Scope Breakdown](#4-project-scope-breakdown)
5. [Internal Payments Engine Requirements](#5-internal-payments-engine-requirements)
6. [Customer Payment Portal Requirements](#6-customer-payment-portal-requirements)
7. [Integration Requirements](#7-integration-requirements)
8. [Non-Functional Requirements](#8-non-functional-requirements)
9. [Data Migration Requirements](#9-data-migration-requirements)
10. [Implementation Approach](#10-implementation-approach)
11. [Acceptance Criteria](#11-acceptance-criteria)
12. [Appendices](#12-appendices)

---

## 1. Introduction

### 1.1 Purpose

This Software Requirements Specification (SRS) document provides a comprehensive specification for modernizing the Fivestar Payments Engine. The project encompasses two distinct but integrated components:

1. **Internal Payments Engine (PE)**: A cloud-native system for Fivestar staff to manage payment operations, reconciliation, and reporting
2. **Customer Payment Portal**: A public-facing web application for customers to make loan payments

This document details the functional requirements, non-functional requirements, system architecture, and implementation strategy for both components.

### 1.2 Scope

The scope of this project encompasses the complete reengineering of Fivestar's payment processing capabilities from a legacy monolithic system to a modern, cloud-native architecture with clear separation between internal and external-facing systems.

**Internal Payments Engine Scope:**
- Cash collection management (field and branch)
- Digital payment processing and reconciliation
- UPI AutoPay and NACH mandate management
- System resilience and LMS integration
- Comprehensive reporting and analytics
- Admin functions and user management

**Customer Payment Portal Scope:**
- Customer authentication and loan verification
- Payment initiation via RazorPay integration
- Receipt generation and payment history
- Mobile-responsive design
- Integration with Internal Payments Engine

### 1.3 Definitions, Acronyms, and Abbreviations

| Term/Acronym | Definition |
|--------------|------------|
| BBPS | Bharat Bill Payment System |
| CBS | Core Banking System |
| DCR | Daily Collection Reconciliation |
| DBS | Daily Balancing Statement |
| EP | Employee Portal (Legacy System) |
| FO | Field Officer |
| HRMS | Human Resource Management System (DarwinBox) |
| LAP | Loan Against Property |
| LMS | Loan Management System (FinnOne) |
| NACH | National Automated Clearing House |
| NBFC | Non-Banking Financial Company |
| OTP | One-Time Password |
| PE | Payments Engine (Internal System) |
| RBAC | Role-Based Access Control |
| SLA | Service Level Agreement |
| UPI | Unified Payments Interface |
| UMRN | Unique Mandate Reference Number |

### 1.4 References

1. Business Requirements Specification (BRS) v2 - Fivestar Payments Engine
2. Functional Requirements Specification (FRS) v2 - Fivestar Payments Engine
3. Non-Functional Requirements (NFR) v2 - Fivestar Payments Engine
4. Fivestar Business Finance - Payments Engine Style Guide
5. Fivestar Payments Engine - UX Design Brief

---

## 2. Overall Description

### 2.1 Product Perspective

The Fivestar Payments Engine modernization involves creating two integrated but architecturally separate systems:

#### 2.1.1 Current State
- Legacy ASP.NET monolithic application (.NET Framework 4.6.1)
- Manual and semi-automated workflows
- Fragmented payment channel handling
- Limited scalability and integration capabilities

#### 2.1.2 Target State
```
┌─────────────────────────────────────────────────────────────┐
│                    FIVESTAR ECOSYSTEM                       │
├─────────────────────────────────────────────────────────────┤
│  PUBLIC INTERNET                    │  INTERNAL NETWORK     │
│                                     │                       │
│  ┌─────────────────────────────┐    │  ┌─────────────────┐  │
│  │   Customer Payment Portal   │    │  │ Internal PE     │  │
│  │   (pay.fivestargroup.in)   │◄───┼─►│ (Staff Portal)  │  │
│  │                             │    │  │                 │  │
│  │ • Customer Authentication   │    │  │ • DCR/DBS       │  │
│  │ • RazorPay Integration     │    │  │ • Mandates      │  │
│  │ • Payment Processing       │    │  │ • Reporting     │  │
│  │ • Receipt Display          │    │  │ • Admin         │  │
│  └─────────────────────────────┘    │  └─────────────────┘  │
│              │                      │          │            │
│              │                      │          │            │
│              └──────────────────────┼──────────┘            │
│                                     │                       │
│           ┌─────────────────────────┼─────────────────────┐ │
│           │            AWS CLOUD INFRASTRUCTURE          │ │
│           │                         │                     │ │
│           │ • API Gateway          │ • ECS Services       │ │
│           │ • Lambda Functions     │ • RDS PostgreSQL     │ │
│           │ • DynamoDB            │ • Event Bridge       │ │
│           └─────────────────────────┼─────────────────────┘ │
│                                     │                       │
└─────────────────────────────────────┼───────────────────────┘
                                      │
                              ┌───────▼──────┐
                              │  LMS/Banks   │
                              │  External    │
                              │  Systems     │
                              └──────────────┘
```

### 2.2 Product Functions

#### 2.2.1 Internal Payments Engine Functions
1. **User Authentication and Authorization**
2. **Cash Collection Management**
3. **Digital Payment Processing and Reconciliation**
4. **AutoPay Mandate Management (UPI/NACH)**
5. **System Resilience and LMS Integration**
6. **Comprehensive Reporting and Analytics**
7. **Administrative Functions**

#### 2.2.2 Customer Payment Portal Functions
1. **Customer Authentication**
2. **Loan Account Verification**
3. **Payment Processing via RazorPay**
4. **Receipt Generation and Display**
5. **Payment History**

### 2.3 User Classes and Characteristics

#### 2.3.1 Internal System Users
- **Branch Cashiers**: Process payments and handle reconciliation
- **Field Officers**: Collect payments via mobile application
- **Finance Team**: Manage exceptions, reconciliation, and reporting
- **Branch Managers**: Approve transactions and monitor performance
- **System Administrators**: Manage system configuration and users

#### 2.3.2 External System Users
- **Customers**: End users making loan payments via web portal

### 2.4 Operating Environment

**Cloud Platform**: Amazon Web Services (AWS)
- **Region**: Mumbai (ap-south-1)
- **Services**: ECS, Lambda, API Gateway, RDS PostgreSQL, DynamoDB, Event Bridge, SQS, Cognito, Amplify

**Client Environments**:
- **Internal Users**: Desktop browsers, mobile devices for field officers
- **External Customers**: Web browsers (desktop and mobile)

### 2.5 Design and Implementation Constraints

1. **Technology Stack**:
   - **Frontend**: React.js (Internal), React.js (Customer Portal)
   - **Backend**: .NET Core microservices
   - **Database**: PostgreSQL (relational), DynamoDB (transactional)
   - **Authentication**: AWS Cognito + DarwinBox integration

2. **Integration Constraints**:
   - MuleSoft must remain primary LMS integration layer
   - Backward compatibility with existing LMS interfaces required
   - Support for existing banking partner APIs

3. **Regulatory Constraints**:
   - RBI compliance for digital payments
   - Data residency requirements for India
   - Audit trail requirements for financial transactions

---

## 3. System Architecture

### 3.1 High-Level Architecture

```
┌──────────────────────────────────────────────────────────────┐
│                      PRESENTATION LAYER                      │
├─────────────────────────────┬────────────────────────────────┤
│    Customer Payment Portal │    Internal Payments Engine    │
│    (AWS Amplify)           │    (AWS Amplify)               │
│    - React.js              │    - React.js                  │
│    - Customer-facing UI    │    - Staff-facing UI           │
└─────────────────────────────┴────────────────────────────────┘
                              │
┌──────────────────────────────────────────────────────────────┐
│                      API GATEWAY LAYER                       │
│    AWS API Gateway                                           │
│    - Authentication & Authorization                          │
│    - Rate Limiting & Throttling                             │
│    - Request Routing                                         │
└──────────────────────────────────────────────────────────────┘
                              │
┌──────────────────────────────────────────────────────────────┐
│                     SERVICE LAYER                            │
├─────────────────────────────┬────────────────────────────────┤
│    Customer Portal APIs     │    Internal PE Services        │
│    - Payment Processing     │    - Cash Management           │
│    - Account Validation     │    - Mandate Management        │
│    - Receipt Generation     │    - Reporting                 │
│                             │    - Admin Functions           │
└─────────────────────────────┴────────────────────────────────┘
                              │
┌──────────────────────────────────────────────────────────────┐
│                      DATA LAYER                              │
│    RDS PostgreSQL          │    DynamoDB                    │
│    - User & Config Data     │    - Transaction Data          │
│    - Reporting Data         │    - Queue Data                │
│    - Audit Logs            │    - Session Data              │
└──────────────────────────────────────────────────────────────┘
                              │
┌──────────────────────────────────────────────────────────────┐
│                   INTEGRATION LAYER                          │
│    External Systems                                          │
│    - LMS (via MuleSoft)                                     │
│    - Banking Partners                                        │
│    - Payment Processors                                      │
│    - HRMS (DarwinBox)                                       │
└──────────────────────────────────────────────────────────────┘
```

### 3.2 Security Architecture

```
┌──────────────────────────────────────────────────────────────┐
│                     SECURITY LAYERS                          │
├──────────────────────────────────────────────────────────────┤
│  WAF & DDoS Protection (AWS CloudFront + WAF)              │
├──────────────────────────────────────────────────────────────┤
│  API Security (Rate Limiting, Authentication, Validation)   │
├──────────────────────────────────────────────────────────────┤
│  Application Security (RBAC, Input Validation, Encryption) │
├──────────────────────────────────────────────────────────────┤
│  Network Security (VPC, Security Groups, Private Subnets)  │
├──────────────────────────────────────────────────────────────┤
│  Data Security (Encryption at Rest & Transit, Audit Logs)  │
└──────────────────────────────────────────────────────────────┘
```

---

## 4. Project Scope Breakdown

### 4.1 Component Separation

| Component | Purpose | Users | Hosting | Integration |
|-----------|---------|-------|---------|-------------|
| **Internal Payments Engine** | Operational management of payments, reconciliation, reporting | Fivestar Staff | Private VPC | Direct system access |
| **Customer Payment Portal** | Customer self-service payment processing | Customers | Public internet | API-based integration with PE |

### 4.2 Shared Infrastructure

**AWS Services Used by Both Components:**
- API Gateway (different stages)
- Lambda Functions
- RDS PostgreSQL
- DynamoDB
- Event Bridge
- CloudWatch Monitoring

### 4.3 Integration Points

```
Customer Portal ←→ Internal PE ←→ LMS
       ↓               ↓           ↓
   RazorPay      Banking APIs   MuleSoft
```

---

## 5. Internal Payments Engine Requirements

[Content continues with detailed requirements from the original document...]

---

## Contact Information

### 1CloudHub Technical Team
- **Executive Sponsor:** Ramakrishna Phani - ramakrishna.phani@1cloudhub.com
- **Project Manager:** Vinod Ramanathan - vinod@1cloudhub.com
- **Solution Architect:** Preeth M - preeth.m@1cloudhub.com

### Fivestar Technical Team
- **Executive Sponsor:** Vanamali Sridharan - vanamali@fivestargroup.in
- **Engineering Head:** Sridharan Vembu - sridhar@fivestargroup.in
- **Project Owner:** Azharuddin Nurul - azharuddin.nurul@fivestargroup.in

---

**Document Classification:** Confidential  
**Distribution:** Limited to technical stakeholders  
**Next Review Date:** July 3, 2025  
**Document Owner:** 1CloudHub Technical Team

---

*This document contains confidential and proprietary information of 1CloudHub and Fivestar Business Finance. Any reproduction or distribution without written consent is prohibited.*