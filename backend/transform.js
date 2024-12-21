function transformReportToSingleObject(data) {
  const report = {
    patientName: data.patient?.name || "Unknown",
    age: data.patient?.age || "Unknown",
    sex: data.patient?.sex || "Unknown",
    referral: {
      doctorName: data.referral?.doctor || "Unknown",
      date: data.referral?.date || "Unknown",
    },
    tests: [],
    prescriptions: data.prescriptions || [], // Include prescriptions if available
    notes: data.notes || "No additional notes",
  };

  // Dynamically process test categories
  if (data.tests) {
    for (const [testCategory, subCategories] of Object.entries(data.tests)) {
      for (const [subCategoryName, metrics] of Object.entries(subCategories)) {
        const transformedMetrics = [];
        for (const [metricName, metricDetails] of Object.entries(metrics)) {
          transformedMetrics.push({
            name: metricName,
            result: metricDetails.result,
            units: metricDetails.units,
            referenceRange: metricDetails.referenceRange,
          });
        }

        report.tests.push({
          type: testCategory, // e.g., "Hematology", "Cardiology"
          subCategory: subCategoryName, // e.g., "Complete Blood Count", "ECG"
          metrics: transformedMetrics,
        });
      }
    }
  }

  return report;
}

module.exports = { transformReportToSingleObject };
