# Database Distribution Strategy: PostgreSQL vs DynamoDB

<div align="center">

![1CloudHub Logo](https://www.1cloudhub.com/wp-content/uploads/2020/01/1CloudHub-Logo-horiz-hires-RGB-copy-1.jpg)
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
![Fivestar Logo](https://fivestargroup.in/storage/2023/04/fivestart-logo-1.png)

**Strategic Data Architecture Documentation**

</div>

---

## Document Information

| **Field** | **Details** |
|-----------|-------------|
| **Document Title** | Database Distribution Strategy |
| **Project Name** | Fivestar Payments Engine Modernization |
| **Client** | Fivestar Business Finance |
| **Prepared By** | 1CloudHub Database Team |
| **Document Version** | v1.0 |
| **Date** | June 4, 2025 |
| **Document Type** | Technical Architecture |
| **Classification** | Confidential |

---

## Approval & Sign-off

| **Role** | **Name** | **Signature** | **Date** |
|----------|----------|---------------|----------|
| **Database Architect** | Ramakrishna Phani | ✅ *Approved* | June 4, 2025 |
| **Technical Lead** | Sridharan Vembu | 🔴 *Pending* | |
| **Client Technical Lead** | Sridharan Vembu | 🔴 *Pending* | |
| **1CloudHub CRO** | Ramakrishna Phani | ✅ *Approved* | June 4, 2025 |

**Approval Status:** ![Status](https://img.shields.io/badge/Status-Pending-red)  
**GitHub Issue:** [Issue #4 - Database Strategy Review](https://github.com/1cloudhub/fivestar-payments-engine/issues/4)  
**Sign-off Tracker:** [Link to tracker](../08_Customer_Approvals/SIGN_OFF_TRACKER.md)

---

## Strategic Data Distribution

### PostgreSQL (Relational Database)
**Purpose**: Master data, configuration, complex relationships, reporting, analytics

### DynamoDB (NoSQL Database)  
**Purpose**: High-volume transactional data, real-time processing, session management

---

## Data Distribution Matrix

| Data Type | Database | Rationale | Examples |
|-----------|----------|-----------|----------|
| **Master Data** | PostgreSQL | Complex relationships, referential integrity, infrequent updates | Users, Branches, Loan Products, Banking Partners |
| **Configuration** | PostgreSQL | ACID compliance, complex queries, administrative access | System Config, Lookup Values, Permissions |
| **User Management** | PostgreSQL | Role-based access control, complex permissions, audit requirements | Users, Roles, Permissions, User Sessions |
| **Customer & Loan Data** | PostgreSQL | Complex joins, reporting requirements, data consistency | Customers, Loan Accounts, Co-borrowers |
| **Mandate Management** | PostgreSQL | Approval workflows, complex business rules, reporting | Payment Mandates, Execution Schedule |
| **Cash Reconciliation** | PostgreSQL | Financial calculations, approval workflows, compliance reporting | DCR, DBS, Daily Reconciliation |
| **Transactions** | DynamoDB | High write volume, real-time processing, horizontal scaling | All payment transactions |
| **Transaction Queue** | DynamoDB | High throughput, automatic retry, time-based processing | LMS downtime handling |
| **Session Data** | DynamoDB | Fast read/write, automatic expiration, high concurrency | User sessions, temporary data |
| **Audit Logs** | DynamoDB | High write volume, time-series data, automatic archival | All system audit logs |
| **Notifications** | DynamoDB | High throughput, automatic expiration, queue processing | SMS, Email, Push notifications |
| **Deduplication** | DynamoDB | Fast lookups, automatic cleanup, high concurrency | Transaction hashes |

---

## Technical Justifications

### PostgreSQL Strengths for Our Use Case

#### 1. **Complex Relationships & Joins**
```sql
-- Example: Complex reporting query
SELECT 
    la.loan_account_number,
    c.customer_name,
    b.branch_name,
    pm.mandate_type,
    SUM(t.amount) as total_payments
FROM loan_accounts la
JOIN customers c ON la.customer_id = c.customer_id
JOIN branches b ON la.branch_code = b.branch_code
LEFT JOIN payment_mandates pm ON la.loan_account_number = pm.loan_account_number
LEFT JOIN transactions t ON la.loan_account_number = t.loan_account_number
WHERE t.status = 'COMPLETED'
GROUP BY la.loan_account_number, c.customer_name, b.branch_name, pm.mandate_type;
```

#### 2. **ACID Compliance for Financial Data**
- **Atomicity**: DCR/DBS calculations must be consistent
- **Consistency**: Mandate approvals follow business rules
- **Isolation**: Concurrent access to same loan account
- **Durability**: Financial data permanently stored

#### 3. **Rich Query Capabilities**
- Complex WHERE clauses with multiple conditions
- Aggregation functions for reporting
- Window functions for analytics
- Full-text search capabilities

### DynamoDB Strengths for Our Use Case

#### 1. **High Write Throughput**
```json
// Example: Payment transaction burst
{
  "scenario": "Peak payment processing",
  "expected_tps": 1000,
  "burst_capacity": 3000,
  "scaling": "Automatic based on demand"
}
```

#### 2. **Automatic Scaling**
- No manual intervention required
- Scales up/down based on actual usage
- Pay only for consumed capacity

#### 3. **Built-in Features**
- **TTL**: Automatic data expiration for temporary data
- **Streams**: Real-time change capture for integrations
- **Global Tables**: Multi-region replication if needed

---

## Data Flow Architecture

### 1. **Transaction Processing Flow**
```
Customer Portal → API Gateway → Lambda → DynamoDB (Transactions)
                                     ↓
                              PostgreSQL (Loan Account validation)
                                     ↓
                              DynamoDB (Audit Logs)
```

### 2. **Mandate Execution Flow**
```
Scheduler → Lambda → PostgreSQL (Mandate Schedule)
                 ↓
         DynamoDB (Mandate Executions)
                 ↓
         Banking Partner API
                 ↓
         DynamoDB (Transaction) → PostgreSQL (Reporting)
```

### 3. **DCR/DBS Flow**
```
Cash Collection → DynamoDB (Transactions)
                      ↓
              Daily Aggregation Job
                      ↓
            PostgreSQL (DCR/DBS Tables)
                      ↓
              Approval Workflow
```

---

## Performance Considerations

### PostgreSQL Optimization

#### 1. **Connection Pooling**
```yaml
Database Configuration:
  max_connections: 200
  shared_buffers: 4GB
  effective_cache_size: 12GB
  work_mem: 256MB
  
Connection Pool:
  max_pool_size: 20
  min_pool_size: 5
  idle_timeout: 300s
```

#### 2. **Read Replicas**
- **Master**: Write operations, real-time reads
- **Read Replica 1**: Reporting queries
- **Read Replica 2**: Analytics workload

#### 3. **Partitioning Strategy**
```sql
-- Partition large tables by date
CREATE TABLE audit_logs_2025_06 PARTITION OF audit_logs 
FOR VALUES FROM ('2025-06-01') TO ('2025-07-01');
```

### DynamoDB Optimization

#### 1. **Partition Key Design**
```json
{
  "transactions": {
    "partition_key": "transaction_id",
    "design_principle": "High cardinality, even distribution"
  },
  "transaction_queue": {
    "partition_key": "queue_id", 
    "gsi_partition_key": "queue_type",
    "design_principle": "Enable efficient batch processing"
  }
}
```

#### 2. **Hot Partition Avoidance**
- Avoid sequential transaction IDs
- Use compound keys when necessary
- Monitor CloudWatch metrics for hot partitions

---

## Data Synchronization Strategy

### 1. **Real-time Sync (DynamoDB → PostgreSQL)**
```yaml
Triggers:
  - DynamoDB Streams
  - Lambda Function processing
  - Immediate sync for critical data

Use Cases:
  - Transaction completion → Update loan account balance
  - Mandate execution → Update mandate status
  - Payment confirmation → Trigger reporting updates
```

### 2. **Batch Sync (DynamoDB → PostgreSQL)**
```yaml
Schedule: 
  - Every 15 minutes for aggregations
  - Daily for reporting data
  - Weekly for historical analysis

Use Cases:
  - Daily transaction summaries
  - Branch collection reports
  - Performance analytics
```

### 3. **Reference Data Sync (PostgreSQL → DynamoDB)**
```yaml
Triggers:
  - Configuration changes
  - Master data updates
  - User permission changes

Caching Strategy:
  - Cache frequently accessed data
  - 5-minute TTL for config data
  - Immediate invalidation for critical updates
```

---

## Migration Strategy

### Phase 1: Master Data Migration (PostgreSQL)
1. **User & Role Data**
   - Export from legacy SQL Server
   - Transform to new schema
   - Validate role mappings

2. **Branch & Configuration Data**
   - Migrate branch hierarchy
   - System configuration parameters
   - Lookup values and constants

### Phase 2: Historical Transaction Migration (DynamoDB)
1. **Transaction History** (Last 12 months)
   - Batch migration using AWS DMS
   - Transform to new JSON structure
   - Validate data integrity

2. **Audit Log Migration**
   - Historical audit data
   - Transform to DynamoDB format
   - Set appropriate TTL values

### Phase 3: Real-time Cutover
1. **Parallel Processing**
   - Dual write to old and new systems
   - Compare results for validation
   - Gradual traffic shift

---

## Monitoring & Alerting

### PostgreSQL Monitoring
```yaml
Key Metrics:
  - Connection pool utilization
  - Query performance (slow query log)
  - Replication lag
  - Database size growth
  
Alerts:
  - Connection pool > 80% utilized
  - Query time > 5 seconds
  - Replication lag > 1 minute
  - Disk usage > 85%
```

### DynamoDB Monitoring
```yaml
Key Metrics:
  - Read/Write capacity utilization
  - Throttled requests
  - Hot partitions
  - GSI capacity utilization
  
Alerts:
  - Throttling detected
  - Hot partition identified
  - Capacity utilization > 80%
  - Error rate > 1%
```

---

## Cost Optimization

### PostgreSQL Costs
```yaml
RDS Instance:
  - r6g.2xlarge for master
  - r6g.xlarge for read replicas
  - Storage: GP3 with provisioned IOPS
  
Estimated Monthly Cost: $1,500-2,000
```

### DynamoDB Costs
```yaml
Billing Mode: Pay-per-request
Expected Usage:
  - 10M read requests/month: $1.25
  - 5M write requests/month: $6.25
  - Storage (100GB): $25
  
Estimated Monthly Cost: $500-800
```

### Total Database Cost: $2,000-2,800/month

---

## Security Considerations

### PostgreSQL Security
- VPC private subnets
- Security groups with minimal access
- Encryption at rest and in transit
- IAM database authentication
- Regular security patches

### DynamoDB Security
- IAM policies with least privilege
- VPC endpoints for private access
- Encryption at rest with KMS
- Point-in-time recovery enabled
- Fine-grained access control

---

## Backup & Disaster Recovery

### PostgreSQL Backup
```yaml
Automated Backups:
  - Daily snapshots with 7-day retention
  - Point-in-time recovery up to 35 days
  - Cross-region backup for disaster recovery

Manual Backups:
  - Before major deployments
  - Monthly long-term retention
```

### DynamoDB Backup
```yaml
Automated Backups:
  - Point-in-time recovery enabled
  - 35-day retention period
  - Cross-region replication for critical tables

On-Demand Backups:
  - Before schema changes
  - Quarterly long-term retention
```

---

## Conclusion

This dual-database strategy leverages the strengths of both PostgreSQL and DynamoDB:

- **PostgreSQL** handles complex business logic, relationships, and reporting
- **DynamoDB** manages high-volume transactions and real-time processing

The architecture provides:
- **Scalability**: Automatic scaling for transaction volumes
- **Performance**: Optimized for different workload patterns  
- **Reliability**: Built-in redundancy and backup mechanisms
- **Cost-effectiveness**: Pay-per-use model for variable workloads
- **Maintainability**: Clear separation of concerns between databases

---

**Document Classification:** Confidential  
**Distribution:** Limited to technical stakeholders  
**Next Review Date:** July 4, 2025  
**Document Owner:** 1CloudHub Database Team

---

*This document contains confidential and proprietary information of 1CloudHub and Fivestar Business Finance. Any reproduction or distribution without written consent is prohibited.*