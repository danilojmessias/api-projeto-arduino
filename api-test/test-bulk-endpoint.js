const axios = require('axios');

const BASE_URL = 'http://localhost:3002';

async function testBulkEndpoint() {
    try {
        console.log('🧪 Testing Bulk Test Creation Endpoint...\n');

        // First, let's create a device and scene for testing
        console.log('1. Creating a test device...');
        const deviceResponse = await axios.post(`${BASE_URL}/devices`, {
            name: 'Test Device for Bulk Tests',
            ip: '192.168.1.100'
        });
        console.log('✅ Device created:', deviceResponse.data.id);

        console.log('\n2. Creating a test scene...');
        const sceneResponse = await axios.post(`${BASE_URL}/scenes`, {
            name: 'Test Scene for Bulk Tests',
            deviceId: deviceResponse.data.id
        });
        console.log('✅ Scene created:', sceneResponse.data.id);

        // Now test the bulk endpoint
        console.log('\n3. Testing bulk test creation...');
        const bulkTestData = {
            sceneId: sceneResponse.data.id,
            tests: [
                { name: 'Test 1 - Active', state: 'active' },
                { name: 'Test 2 - Inactive', state: 'inactive' },
                { name: 'Test 3 - Default State' },
                { name: 'Test 4 - Performance Test', state: 'active' },
                { name: 'Test 5 - Load Test', state: 'inactive' }
            ]
        };

        const bulkResponse = await axios.post(`${BASE_URL}/tests/bulk`, bulkTestData);
        console.log('✅ Bulk creation response:');
        console.log('   Success:', bulkResponse.data.success);
        console.log('   Message:', bulkResponse.data.message);
        console.log('   Created Tests:', bulkResponse.data.createdTests.length);

        if (bulkResponse.data.failedTests && bulkResponse.data.failedTests.length > 0) {
            console.log('   Failed Tests:', bulkResponse.data.failedTests.length);
        }

        // Verify tests were created by fetching them
        console.log('\n4. Verifying created tests...');
        const testsResponse = await axios.get(`${BASE_URL}/tests?sceneId=${sceneResponse.data.id}`);
        console.log('✅ Total tests found:', testsResponse.data.length);

        testsResponse.data.forEach((test, index) => {
            console.log(`   ${index + 1}. ${test.name} (${test.state})`);
        });

        // Test error handling with invalid sceneId
        console.log('\n5. Testing error handling with invalid sceneId...');
        try {
            await axios.post(`${BASE_URL}/tests/bulk`, {
                sceneId: '507f1f77bcf86cd799439011', // Invalid but properly formatted ObjectId
                tests: [{ name: 'Should Fail' }]
            });
        } catch (error) {
            console.log('✅ Error handling works:', error.response.data.message || error.message);
        }

        // Test validation with empty tests array
        console.log('\n6. Testing validation with empty tests array...');
        try {
            await axios.post(`${BASE_URL}/tests/bulk`, {
                sceneId: sceneResponse.data.id,
                tests: []
            });
        } catch (error) {
            console.log('✅ Validation works:', error.response.data.message || error.message);
        }

        console.log('\n🎉 All tests completed successfully!');

    } catch (error) {
        console.error('❌ Test failed:', error.response?.data?.message || error.message);
        console.error('Full error:', error.response?.data || error.message);
    }
}

// Run the test
testBulkEndpoint();