export const styles = `
* {
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  line-height: 1.5;
  color: #333;
  margin: 0;
  padding: 0;
  background-color: #f5f5f5;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

header {
  background-color: #333;
  color: #fff;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 5px;
}

header h1 {
  margin: 0;
  font-size: 24px;
}

header .timestamp {
  color: #ccc;
  font-size: 14px;
}

.summary {
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  margin-bottom: 20px;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
}

.summary-label {
  font-weight: 600;
  font-size: 16px;
}

.success {
  color: #28a745;
}

.failure {
  color: #dc3545;
}

.metric {
  font-weight: bold;
  font-size: 18px;
}

.test-files {
  margin-bottom: 20px;
}

.file-block {
  background-color: #fff;
  padding: 15px;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  margin-bottom: 15px;
}

.file-header {
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.file-name {
  font-weight: 600;
  font-size: 18px;
}

.file-status {
  padding: 5px 10px;
  border-radius: 15px;
  font-size: 12px;
  font-weight: bold;
  text-transform: uppercase;
}

.file-status.passed {
  background-color: #d4edda;
  color: #28a745;
}

.file-status.failed {
  background-color: #f8d7da;
  color: #dc3545;
}

.file-meta {
  color: #666;
  font-size: 14px;
  margin-bottom: 15px;
}

.test-suite {
  margin-bottom: 15px;
  padding-left: 15px;
  border-left: 3px solid #ddd;
}

.suite-name {
  font-weight: 600;
  font-size: 16px;
  margin-bottom: 10px;
}

.test-case {
  padding: 8px;
  margin-bottom: 5px;
  border-radius: 3px;
}

.test-case.passed {
  background-color: #d4edda;
}

.test-case.failed {
  background-color: #f8d7da;
}

.test-name {
  font-size: 14px;
}

.error-details {
  background-color: #f8f9fa;
  padding: 10px;
  margin-top: 5px;
  border-left: 3px solid #dc3545;
  font-family: monospace;
  white-space: pre-wrap;
  font-size: 12px;
}

.coverage-section {
  margin-top: 30px;
}

.coverage-header {
  font-size: 20px;
  margin-bottom: 15px;
}

.coverage-file {
  background-color: #fff;
  padding: 15px;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  margin-bottom: 10px;
}

.coverage-details {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 15px;
}

.coverage-item {
  display: flex;
  flex-direction: column;
}

.coverage-label {
  font-size: 12px;
  color: #666;
}

.coverage-value {
  font-weight: bold;
  font-size: 16px;
}

.progress-bar {
  height: 8px;
  background-color: #e9ecef;
  border-radius: 4px;
  margin-top: 5px;
  overflow: hidden;
  width: 100%!important;
  flex-shrink: 0;
}

.progress-value {
  height: 100%;
  background-color: #28a745;
}

.progress-value.low {
  background-color: #dc3545;
}

.progress-value.medium {
  background-color: #ffc107;
}

footer {
  margin-top: 30px;
  text-align: center;
  color: #666;
  font-size: 14px;
}

.charts {
  display: flex;
  gap: 20px;
  margin: 20px 0;
}

.chart {
  flex: 1;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  padding: 15px;
}
`
