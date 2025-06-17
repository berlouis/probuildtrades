curl -X POST http://localhost:3000/api/admin/builders \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Audit Test Builder",
    "email": "auditbuilder1@example.com",
    "licenseId": "TEST-12345-AUDIT",
    "phone": "555-0101",
    "address": "123 Audit Street",
    "licenseStatus": "active",
    "licenseClass": "A",
    "licenseExpiry": "2030-12-31",
    "licenseState": "NSW",
    "userId": 1
  }'
