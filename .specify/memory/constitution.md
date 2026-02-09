<!-- 
Sync Impact Report:
- Version change: 1.0.0 → 1.1.0
- Modified principles: All principles were newly defined
- Added sections: Core Principles, Additional Constraints, Development Workflow
- Removed sections: None
- Templates requiring updates: N/A
- Follow-up TODOs: None
-->
# Secure Multi-User Todo Full-Stack Web Application Constitution

## Core Principles

### Security by Default
All API endpoints require a valid JWT; User data isolation must be enforced at every layer; No unauthenticated or cross-user access allowed.

### Spec-Driven Development
Every feature must be explicitly derived from a written spec; All API behavior must be deterministic and documented; Follow the spec → plan → tasks → implementation workflow.

### Zero Manual Coding
All code generated via Qwen Code; No manual coding allowed; Clear separation of concerns (auth, backend, frontend); Deterministic and reviewable outputs at every phase.

### Technology Standardization
Frontend: Next.js 16+ with App Router; Backend: FastAPI (Python); ORM: SQLModel; Database: Neon Serverless PostgreSQL; Authentication: Better Auth (JWT-based).

### Security Enforcement
Authentication must be stateless and cryptographically verifiable; JWTs must be verified using a shared secret (BETTER_AUTH_SECRET); User identity must be derived from JWT claims only; URL user_id must match authenticated user identity; Invalid, missing, or expired tokens must return 401 Unauthorized; No hardcoded secrets or credentials in source code.

### API Design Standards
RESTful endpoint design; Proper HTTP status codes for all operations; Task ownership enforced on every query; No cross-user reads or writes under any condition; Backend must be stateless and session-free.

## Additional Constraints

### Frontend Standards
Auth-aware routing (public vs protected routes); JWT attached automatically to all API requests; Clear UX feedback for loading, errors, and auth failures; Responsive and accessible UI.

### Operational Constraints
Serverless-compatible architecture; Environment-based configuration (dev / prod); No background jobs, cron tasks, or websockets; No role-based access control beyond single-user ownership.

### Evaluation Constraints
All 5 basic-level Todo features implemented; All required API endpoints implemented and secured; Persistent storage via Neon PostgreSQL; Authentication fully integrated end-to-end; Entire development follows Agentic Dev Stack workflow.

## Development Workflow

### Success Criteria
Every phase (spec, plan, tasks, implementation) is reviewable; No unauthorized access paths exist; Each user only sees and modifies their own tasks; Application runs successfully as a multi-user web app; Hackathon reviewers can trace implementation directly back to specs.

### Technology Standards
Spec system: Qwen Code + Spec-Kit Plus; Use appropriate specialized agents for different layers (Auth Agent, Frontend Agent, DB Agent, Backend Agent).

## Governance

All development must comply with these principles; Changes to the constitution require explicit documentation and approval; Each implementation phase must be traceable back to the original specification; Code reviews must verify compliance with all security and architectural standards.

**Version**: 1.1.0 | **Ratified**: 2026-02-09 | **Last Amended**: 2026-02-09
