# DEPLOYMENT GUIDE
# FIVESTAR PAYMENTS ENGINE

**DATE:** 03-June-2025  
**Authored By:** 1CloudHub DevOps Team  
**Version:** 1.0  
**Based on SRS Version:** 3.0

---

## TABLE OF CONTENTS

1. [Introduction](#1-introduction)
2. [AWS Account Structure](#2-aws-account-structure)
3. [Infrastructure Setup](#3-infrastructure-setup)
4. [Environment Configuration](#4-environment-configuration)
5. [Application Deployment](#5-application-deployment)
6. [Database Deployment](#6-database-deployment)
7. [Security Configuration](#7-security-configuration)
8. [Monitoring Setup](#8-monitoring-setup)
9. [Deployment Procedures](#9-deployment-procedures)
10. [Rollback Procedures](#10-rollback-procedures)
11. [Validation & Testing](#11-validation--testing)
12. [Troubleshooting](#12-troubleshooting)

---

## 1. Introduction

### 1.1 Purpose

This Deployment Guide provides comprehensive instructions for deploying the Fivestar Payments Engine infrastructure and applications across AWS environments. It covers both the Internal Payments Engine and Customer Payment Portal components.

### 1.2 Deployment Strategy

**Multi-Account Setup with Hybrid Deployment Approach:**
- **Development/Staging**: Big bang deployments for rapid iteration
- **Production**: Phased rollout of components to minimize business risk
- **Infrastructure**: Infrastructure as Code using AWS CloudFormation/CDK

### 1.3 Key Architectural Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| AWS Account Structure | Multi-account (dev/staging/prod) | Better security isolation and cost management |
| VPC CIDR Range | 192.168.0.0/24 | Smaller, more controlled address space |
| RDS Instance | db.r6g.large (2 vCPU, 16 GB RAM) | Conservative start with scaling capability |
| Deployment Strategy | Hybrid approach per component | Risk mitigation for production systems |

---

## 2. AWS Account Structure

### 2.1 Account Hierarchy

```
Fivestar Organization
├── Management Account (Root)
│   ├── Billing and cost management
│   ├── Account provisioning
│   └── Cross-account IAM roles
├── Development Account
│   ├── Development environment
│   ├── Feature testing
│   └── Integration testing
├── Staging Account
│   ├── Pre-production environment
│   ├── Performance testing
│   └── User acceptance testing
└── Production Account
    ├── Production environment
    ├── Production data
    └── Customer-facing services
```

### 2.2 Account Configuration

#### 2.2.1 Development Account

```yaml
Account Details:
  Account ID: 123456789012
  Account Name: fivestar-payments-dev
  Purpose: Development and testing
  
Resource Limits:
  EC2 Instances: 50
  RDS Instances: 10
  Lambda Concurrent Executions: 1000
  
Cost Controls:
  Budget Alert: $1,000/month
  Auto-shutdown: Non-prod resources after business hours
```

#### 2.2.2 Staging Account

```yaml
Account Details:
  Account ID: 123456789013
  Account Name: fivestar-payments-staging
  Purpose: Pre-production validation
  
Resource Configuration:
  Production-like sizing: 50% of production capacity
  Performance testing: Enabled
  Security testing: Enabled
  
Cost Controls:
  Budget Alert: $3,000/month
  Resource cleanup: Weekly automated cleanup
```

#### 2.2.3 Production Account

```yaml
Account Details:
  Account ID: 123456789014
  Account Name: fivestar-payments-prod
  Purpose: Production operations
  
Security Controls:
  MFA Required: All users
  CloudTrail: Enabled with log file validation
  Config: Enabled for compliance monitoring
  GuardDuty: Enabled for threat detection
  
High Availability:
  Multi-AZ deployment: Required
  Backup strategy: Automated with cross-region replication
  Disaster recovery: RTO < 4 hours, RPO < 1 hour
```

### 2.3 Cross-Account Access

#### 2.3.1 IAM Cross-Account Roles

```yaml
DeploymentRole:
  Account: Production
  Trusted Entities: 
    - Staging Account CI/CD role
    - Development Account (limited)
  Permissions:
    - ECS deployment
    - Lambda function updates
    - CloudFormation stack management

MonitoringRole:
  Account: All accounts
  Trusted Entities:
    - Central monitoring account
  Permissions:
    - CloudWatch read access
    - X-Ray trace access
    - Log group access
```

---

## 3. Infrastructure Setup

### 3.1 Core Infrastructure Components

#### 3.1.1 VPC Configuration

```yaml
VPC Specification:
  CIDR: 192.168.0.0/24
  Region: ap-south-1 (Mumbai)
  Availability Zones: ap-south-1a, ap-south-1b, ap-south-1c
  
Subnet Configuration:
  Public Subnets:
    - 192.168.0.0/27 (ap-south-1a) # Load Balancer, NAT Gateway
    - 192.168.0.32/27 (ap-south-1b) # Load Balancer, NAT Gateway
    
  Private App Subnets:
    - 192.168.0.64/27 (ap-south-1a) # ECS Services, Lambda
    - 192.168.0.96/27 (ap-south-1b) # ECS Services, Lambda
    
  Private DB Subnets:
    - 192.168.0.128/27 (ap-south-1a) # RDS, DynamoDB VPC endpoints
    - 192.168.0.160/27 (ap-south-1b) # RDS, DynamoDB VPC endpoints
    
  Reserved:
    - 192.168.0.192/26 # Future expansion
```

#### 3.1.2 Security Groups

```yaml
ALB-SecurityGroup:
  Ingress:
    - Port: 443 (HTTPS) from 0.0.0.0/0
    - Port: 80 (HTTP) from 0.0.0.0/0 (redirect to HTTPS)
  Egress:
    - All traffic to ECS-SecurityGroup

ECS-SecurityGroup:
  Ingress:
    - Port: 8080 from ALB-SecurityGroup
    - Port: 8443 from ALB-SecurityGroup
  Egress:
    - Port: 5432 to RDS-SecurityGroup
    - Port: 443 to 0.0.0.0/0 (AWS APIs, external integrations)

RDS-SecurityGroup:
  Ingress:
    - Port: 5432 from ECS-SecurityGroup
    - Port: 5432 from Lambda-SecurityGroup
  Egress: None

Lambda-SecurityGroup:
  Ingress: None
  Egress:
    - Port: 443 to 0.0.0.0/0 (AWS APIs)
    - Port: 5432 to RDS-SecurityGroup
```

### 3.2 CloudFormation Templates

#### 3.2.1 Master Stack Template

```yaml
# infrastructure/master-stack.yaml
AWSTemplateFormatVersion: '2010-09-09'
Description: 'Fivestar Payments Engine - Master Infrastructure Stack'

Parameters:
  Environment:
    Type: String
    AllowedValues: [dev, staging, prod]
    Description: Environment name
  
  VPCCidr:
    Type: String
    Default: '192.168.0.0/24'
    Description: VPC CIDR range

Resources:
  NetworkStack:
    Type: AWS::CloudFormation::Stack
    Properties:
      TemplateURL: !Sub 'https://s3.amazonaws.com/fivestar-cf-templates/network-stack.yaml'
      Parameters:
        Environment: !Ref Environment
        VPCCidr: !Ref VPCCidr

  SecurityStack:
    Type: AWS::CloudFormation::Stack
    DependsOn: NetworkStack
    Properties:
      TemplateURL: !Sub 'https://s3.amazonaws.com/fivestar-cf-templates/security-stack.yaml'
      Parameters:
        Environment: !Ref Environment
        VPCId: !GetAtt NetworkStack.Outputs.VPCId

  DatabaseStack:
    Type: AWS::CloudFormation::Stack
    DependsOn: [NetworkStack, SecurityStack]
    Properties:
      TemplateURL: !Sub 'https://s3.amazonaws.com/fivestar-cf-templates/database-stack.yaml'
      Parameters:
        Environment: !Ref Environment
        DBSubnetGroupName: !GetAtt NetworkStack.Outputs.DBSubnetGroup
        DBSecurityGroupId: !GetAtt SecurityStack.Outputs.RDSSecurityGroup

  ComputeStack:
    Type: AWS::CloudFormation::Stack
    DependsOn: [NetworkStack, SecurityStack, DatabaseStack]
    Properties:
      TemplateURL: !Sub 'https://s3.amazonaws.com/fivestar-cf-templates/compute-stack.yaml'
      Parameters:
        Environment: !Ref Environment
        VPCId: !GetAtt NetworkStack.Outputs.VPCId
        PrivateSubnets: !GetAtt NetworkStack.Outputs.PrivateAppSubnets
        ECSSecurityGroupId: !GetAtt SecurityStack.Outputs.ECSSecurityGroup
```

#### 3.2.2 ECS Cluster Configuration

```yaml
# infrastructure/compute-stack.yaml
ECSCluster:
  Type: AWS::ECS::Cluster
  Properties:
    ClusterName: !Sub '${Environment}-fivestar-payments'
    CapacityProviders:
      - FARGATE
      - FARGATE_SPOT
    DefaultCapacityProviderStrategy:
      - CapacityProvider: FARGATE
        Weight: 1
        Base: 2
      - CapacityProvider: FARGATE_SPOT
        Weight: 4

ECSExecutionRole:
  Type: AWS::IAM::Role
  Properties:
    AssumeRolePolicyDocument:
      Version: '2012-10-17'
      Statement:
        - Effect: Allow
          Principal:
            Service: ecs-tasks.amazonaws.com
          Action: sts:AssumeRole
    ManagedPolicyArns:
      - arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy
    Policies:
      - PolicyName: SecretsManagerAccess
        PolicyDocument:
          Version: '2012-10-17'
          Statement:
            - Effect: Allow
              Action:
                - secretsmanager:GetSecretValue
              Resource: 
                - !Sub 'arn:aws:secretsmanager:${AWS::Region}:${AWS::AccountId}:secret:fivestar/payments/*'
```

---

## 4. Environment Configuration

### 4.1 Environment-Specific Settings

#### 4.1.1 Development Environment

```yaml
Configuration:
  Environment: development
  Debug: true
  LogLevel: DEBUG
  
Infrastructure:
  ECS:
    DesiredCount: 1
    CPU: 512
    Memory: 1024
  RDS:
    InstanceClass: db.t3.medium
    AllocatedStorage: 100
    BackupRetentionPeriod: 7
  DynamoDB:
    BillingMode: PAY_PER_REQUEST
    
External Integrations:
  RazorPay: Sandbox environment
  JusPay: Testing environment
  LMS: Mock service or development LMS
  
Monitoring:
  DetailedMonitoring: false
  LogRetention: 7 days
```

#### 4.1.2 Staging Environment

```yaml
Configuration:
  Environment: staging
  Debug: false
  LogLevel: INFO
  
Infrastructure:
  ECS:
    DesiredCount: 2
    CPU: 1024
    Memory: 2048
  RDS:
    InstanceClass: db.r6g.large
    AllocatedStorage: 500
    BackupRetentionPeriod: 14
    MultiAZ: true
  DynamoDB:
    BillingMode: PAY_PER_REQUEST
    
External Integrations:
  RazorPay: Sandbox environment
  JusPay: Testing environment
  LMS: Staging LMS environment
  
Monitoring:
  DetailedMonitoring: true
  LogRetention: 30 days
```

#### 4.1.3 Production Environment

```yaml
Configuration:
  Environment: production
  Debug: false
  LogLevel: WARN
  
Infrastructure:
  ECS:
    DesiredCount: 3
    CPU: 2048
    Memory: 4096
    MinCapacity: 2
    MaxCapacity: 10
  RDS:
    InstanceClass: db.r6g.large
    AllocatedStorage: 1000
    BackupRetentionPeriod: 35
    MultiAZ: true
    ReadReplicas: 2
  DynamoDB:
    BillingMode: PAY_PER_REQUEST
    PointInTimeRecovery: true
    
External Integrations:
  RazorPay: Production environment
  JusPay: Production environment
  LMS: Production LMS
  
Monitoring:
  DetailedMonitoring: true
  LogRetention: 90 days
  
Security:
  WAF: Enabled
  GuardDuty: Enabled
  Config: Enabled
```

### 4.2 Configuration Management

#### 4.2.1 AWS Systems Manager Parameter Store

```yaml
Parameter Hierarchy:
  /fivestar/payments/{environment}/app/
    - database_url
    - redis_url
    - jwt_secret_key
    - razorpay_key_id
    - juspay_merchant_id
    
  /fivestar/payments/{environment}/integrations/
    - lms_endpoint
    - mulesoft_endpoint
    - banking_partner_configs
    
  /fivestar/payments/{environment}/features/
    - maintenance_mode
    - feature_flags
    - rate_limits
```

#### 4.2.2 AWS Secrets Manager

```yaml
Secrets Structure:
  fivestar/payments/{environment}/database:
    username: fivestar_app
    password: <generated>
    host: <rds-endpoint>
    port: 5432
    database: fivestar_payments
    
  fivestar/payments/{environment}/razorpay:
    key_id: <razorpay-key>
    key_secret: <razorpay-secret>
    webhook_secret: <webhook-secret>
    
  fivestar/payments/{environment}/juspay:
    merchant_id: <juspay-merchant-id>
    api_key: <juspay-api-key>
    webhook_username: <webhook-username>
    webhook_password: <webhook-password>
```

---

## 5. Application Deployment

### 5.1 Container Configuration

#### 5.1.1 Internal Payments Engine

```yaml
# docker/internal-pe/Dockerfile
FROM node:18-alpine AS ui-build
WORKDIR /app/ui
COPY ui/package*.json ./
RUN npm ci --only=production
COPY ui/ ./
RUN npm run build

FROM mcr.microsoft.com/dotnet/aspnet:8.0-alpine AS runtime
WORKDIR /app

# Copy application files
COPY --from=build /app/publish .
COPY --from=ui-build /app/ui/build ./wwwroot

# Set environment variables
ENV ASPNETCORE_ENVIRONMENT=Production
ENV ASPNETCORE_URLS=http://+:8080

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:8080/health || exit 1

EXPOSE 8080
ENTRYPOINT ["dotnet", "FivestarPaymentsEngine.dll"]
```

#### 5.1.2 Customer Payment Portal

```yaml
# docker/customer-portal/Dockerfile
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build

FROM nginx:alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/build /usr/share/nginx/html

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost/ || exit 1

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### 5.2 ECS Task Definitions

#### 5.2.1 Internal Payments Engine Task Definition

```json
{
  "family": "fivestar-internal-pe",
  "networkMode": "awsvpc",
  "requiresCompatibilities": ["FARGATE"],
  "cpu": "1024",
  "memory": "2048",
  "executionRoleArn": "arn:aws:iam::ACCOUNT:role/ecsTaskExecutionRole",
  "taskRoleArn": "arn:aws:iam::ACCOUNT:role/ecsTaskRole",
  "containerDefinitions": [
    {
      "name": "internal-pe",
      "image": "ACCOUNT.dkr.ecr.ap-south-1.amazonaws.com/fivestar-internal-pe:latest",
      "portMappings": [
        {
          "containerPort": 8080,
          "protocol": "tcp"
        }
      ],
      "essential": true,
      "logConfiguration": {
        "logDriver": "awslogs",
        "options": {
          "awslogs-group": "/ecs/fivestar-internal-pe",
          "awslogs-region": "ap-south-1",
          "awslogs-stream-prefix": "ecs"
        }
      },
      "environment": [
        {
          "name": "ASPNETCORE_ENVIRONMENT",
          "value": "Production"
        }
      ],
      "secrets": [
        {
          "name": "DATABASE_CONNECTION_STRING",
          "valueFrom": "arn:aws:secretsmanager:ap-south-1:ACCOUNT:secret:fivestar/payments/prod/database"
        }
      ],
      "healthCheck": {
        "command": ["CMD-SHELL", "curl -f http://localhost:8080/health || exit 1"],
        "interval": 30,
        "timeout": 5,
        "retries": 3,
        "startPeriod": 60
      }
    }
  ]
}
```

---

## 6. Database Deployment

### 6.1 PostgreSQL (RDS) Deployment

#### 6.1.1 RDS Instance Configuration

```yaml
RDSInstance:
  Type: AWS::RDS::DBInstance
  Properties:
    DBInstanceIdentifier: !Sub '${Environment}-fivestar-payments-db'
    DBInstanceClass: db.r6g.large
    Engine: postgres
    EngineVersion: '15.4'
    AllocatedStorage: 1000
    StorageType: gp3
    StorageEncrypted: true
    KmsKeyId: !Ref DatabaseKMSKey
    
    # Database Configuration
    DBName: fivestar_payments
    MasterUsername: !Sub '{{resolve:secretsmanager:fivestar/payments/${Environment}/database:SecretString:username}}'
    MasterUserPassword: !Sub '{{resolve:secretsmanager:fivestar/payments/${Environment}/database:SecretString:password}}'
    
    # Network Configuration
    DBSubnetGroupName: !Ref DBSubnetGroup
    VPCSecurityGroups:
      - !Ref RDSSecurityGroup
    PubliclyAccessible: false
    
    # Backup Configuration
    BackupRetentionPeriod: !If [IsProduction, 35, 7]
    PreferredBackupWindow: '03:00-04:00'
    PreferredMaintenanceWindow: 'sun:04:00-sun:05:00'
    
    # High Availability
    MultiAZ: !If [IsProduction, true, false]
    
    # Monitoring
    MonitoringInterval: 60
    MonitoringRoleArn: !GetAtt RDSEnhancedMonitoringRole.Arn
    EnablePerformanceInsights: true
    PerformanceInsightsRetentionPeriod: 7
    
    # Parameter Group
    DBParameterGroupName: !Ref DatabaseParameterGroup
    
    DeletionProtection: !If [IsProduction, true, false]
    DeleteAutomatedBackups: false
```

---

## 7. Security Configuration

### 7.1 IAM Roles and Policies

#### 7.1.1 ECS Task Role

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "dynamodb:GetItem",
        "dynamodb:PutItem",
        "dynamodb:UpdateItem",
        "dynamodb:DeleteItem",
        "dynamodb:Query",
        "dynamodb:Scan"
      ],
      "Resource": [
        "arn:aws:dynamodb:ap-south-1:ACCOUNT:table/ENV-fivestar-transactions",
        "arn:aws:dynamodb:ap-south-1:ACCOUNT:table/ENV-fivestar-transactions/index/*",
        "arn:aws:dynamodb:ap-south-1:ACCOUNT:table/ENV-fivestar-transaction-queue",
        "arn:aws:dynamodb:ap-south-1:ACCOUNT:table/ENV-fivestar-transaction-queue/index/*"
      ]
    },
    {
      "Effect": "Allow",
      "Action": [
        "secretsmanager:GetSecretValue"
      ],
      "Resource": [
        "arn:aws:secretsmanager:ap-south-1:ACCOUNT:secret:fivestar/payments/ENV/*"
      ]
    },
    {
      "Effect": "Allow",
      "Action": [
        "ssm:GetParameter",
        "ssm:GetParameters",
        "ssm:GetParametersByPath"
      ],
      "Resource": [
        "arn:aws:ssm:ap-south-1:ACCOUNT:parameter/fivestar/payments/ENV/*"
      ]
    }
  ]
}
```

---

## 8. Monitoring Setup

### 8.1 CloudWatch Configuration

#### 8.1.1 Log Groups

```yaml
ApplicationLogGroup:
  Type: AWS::Logs::LogGroup
  Properties:
    LogGroupName: !Sub '/ecs/${Environment}-fivestar-internal-pe'
    RetentionInDays: !If [IsProduction, 90, 30]
    KmsKeyId: !GetAtt CloudWatchKMSKey.Arn
```

---

## 9. Deployment Procedures

### 9.1 Infrastructure Deployment Script

```bash
#!/bin/bash
# deploy-infrastructure.sh

set -e

ENVIRONMENT=$1
AWS_REGION="ap-south-1"
STACK_NAME="fivestar-payments-${ENVIRONMENT}"

if [ -z "$ENVIRONMENT" ]; then
    echo "Usage: $0 <environment>"
    echo "Environment must be one of: dev, staging, prod"
    exit 1
fi

echo "Deploying Fivestar Payments Engine infrastructure for environment: ${ENVIRONMENT}"

# Validate CloudFormation template
echo "Validating CloudFormation template..."
aws cloudformation validate-template \
    --template-body file://infrastructure/master-stack.yaml \
    --region $AWS_REGION

# Deploy the stack
aws cloudformation deploy \
    --stack-name $STACK_NAME \
    --template-file infrastructure/master-stack.yaml \
    --parameter-overrides Environment=$ENVIRONMENT \
    --capabilities CAPABILITY_IAM CAPABILITY_NAMED_IAM \
    --region $AWS_REGION \
    --tags Environment=$ENVIRONMENT Project=FivestarPaymentsEngine Owner=1CloudHub

echo "Infrastructure deployment completed successfully!"
```

---

## 10. Rollback Procedures

### 10.1 Application Rollback Script

```bash
#!/bin/bash
# rollback-application.sh

set -e

ENVIRONMENT=$1
COMPONENT=$2
TARGET_REVISION=$3

if [ -z "$ENVIRONMENT" ] || [ -z "$COMPONENT" ]; then
    echo "Usage: $0 <environment> <component> [target_revision]"
    echo "Components: internal-pe, customer-portal"
    exit 1
fi

echo "Rolling back component: ${COMPONENT} in environment: ${ENVIRONMENT}"

SERVICE_NAME="${ENVIRONMENT}-${COMPONENT}-service"
CLUSTER_NAME="${ENVIRONMENT}-fivestar-payments"

if [ -z "$TARGET_REVISION" ]; then
    # Get previous stable task definition
    TARGET_REVISION=$(aws ecs list-task-definitions \
        --family-prefix "${ENVIRONMENT}-fivestar-${COMPONENT}" \
        --status ACTIVE \
        --sort DESC \
        --query 'taskDefinitionArns[1]' \
        --output text \
        --region ap-south-1)
fi

echo "Rolling back to task definition: $TARGET_REVISION"

# Update service with previous task definition
aws ecs update-service \
    --cluster $CLUSTER_NAME \
    --service $SERVICE_NAME \
    --task-definition $TARGET_REVISION \
    --region ap-south-1

# Wait for rollback to complete
aws ecs wait services-stable \
    --cluster $CLUSTER_NAME \
    --services $SERVICE_NAME \
    --region ap-south-1

echo "Rollback completed successfully!"
```

---

## 11. Validation & Testing

### 11.1 Post-Deployment Validation

#### 11.1.1 Health Check Script

```bash
#!/bin/bash
# validate-deployment.sh

set -e

ENVIRONMENT=$1

if [ -z "$ENVIRONMENT" ]; then
    echo "Usage: $0 <environment>"
    exit 1
fi

echo "Validating deployment for environment: ${ENVIRONMENT}"

# Check ECS service status
echo "Checking ECS services..."
aws ecs describe-services \
    --cluster "${ENVIRONMENT}-fivestar-payments" \
    --services "${ENVIRONMENT}-internal-pe-service" "${ENVIRONMENT}-customer-portal-service" \
    --query 'services[*].[serviceName,status,runningCount,desiredCount]' \
    --output table \
    --region ap-south-1

# Check RDS instance status
echo "Checking RDS instance..."
aws rds describe-db-instances \
    --db-instance-identifier "${ENVIRONMENT}-fivestar-payments-db" \
    --query 'DBInstances[0].[DBInstanceIdentifier,DBInstanceStatus,AvailabilityZone]' \
    --output table \
    --region ap-south-1

# Health endpoint checks
echo "Performing health checks..."
ALB_DNS=$(aws elbv2 describe-load-balancers \
    --names "${ENVIRONMENT}-internal-pe-alb" \
    --query 'LoadBalancers[0].DNSName' \
    --output text \
    --region ap-south-1)

if curl -f "http://$ALB_DNS/health" > /dev/null 2>&1; then
    echo "✅ Internal PE health check passed"
else
    echo "❌ Internal PE health check failed"
    exit 1
fi

echo "✅ All validation checks passed!"
```

---

## 12. Troubleshooting

### 12.1 Common Issues

#### 12.1.1 ECS Service Issues

**Issue**: ECS tasks failing to start
```bash
# Check task definition
aws ecs describe-task-definition \
    --task-definition ${ENVIRONMENT}-fivestar-internal-pe \
    --region ap-south-1

# Check service events
aws ecs describe-services \
    --cluster ${ENVIRONMENT}-fivestar-payments \
    --services ${ENVIRONMENT}-internal-pe-service \
    --query 'services[0].events' \
    --region ap-south-1
```

**Issue**: Health check failures
```bash
# Check container logs
aws logs tail /ecs/${ENVIRONMENT}-fivestar-internal-pe \
    --follow \
    --region ap-south-1
```

#### 12.1.2 Database Connection Issues

**Issue**: Database connection timeouts
```bash
# Check security group rules
aws ec2 describe-security-groups \
    --group-ids sg-xxxxxxxxx \
    --query 'SecurityGroups[0].IpPermissions' \
    --region ap-south-1

# Test database connectivity from ECS task
aws ecs run-task \
    --cluster ${ENVIRONMENT}-fivestar-payments \
    --task-definition debug-task \
    --region ap-south-1
```

### 12.2 Monitoring and Alerts

#### 12.2.1 Key Metrics to Monitor

```yaml
Critical Metrics:
  - ECS Service CPU/Memory utilization
  - RDS connections and performance
  - Application response times
  - Error rates and failed transactions
  - DynamoDB throttling

Alert Thresholds:
  - CPU > 80% for 5 minutes
  - Memory > 85% for 3 minutes
  - Error rate > 5% for 2 minutes
  - Database connections > 80% of max
```

#### 12.2.2 Log Analysis

```bash
# Search for errors in application logs
aws logs filter-log-events \
    --log-group-name "/ecs/${ENVIRONMENT}-fivestar-internal-pe" \
    --filter-pattern "ERROR" \
    --start-time $(date -d '1 hour ago' +%s)000 \
    --region ap-south-1

# Monitor database slow queries
aws logs filter-log-events \
    --log-group-name "/aws/rds/instance/${ENVIRONMENT}-fivestar-payments-db/postgresql" \
    --filter-pattern "duration" \
    --region ap-south-1
```

---

**Document Version**: 1.0  
**Last Updated**: June 03, 2025  
**Next Review**: September 03, 2025