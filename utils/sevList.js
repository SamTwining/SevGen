

function extractSeverityCounts30to90(severityCountObj) {
    const severityIntervals = Object.keys(severityCountObj);
    const totalVulnerabilitiesPerSeverity = {};
    for (let i = 0; i < severityIntervals.length; i++) {
        // We don't care about 0 days
        if (severityIntervals[i].endsWith('_0')) continue;

        // Extract the severity by grabbing everything before the first delimiter
        // ex critical_0
        //            ^
        const severity = severityIntervals[i].substring(0, severityIntervals[i].indexOf('_'));

        // If we don't have an entry in our dictionary yet, create one
        if(!totalVulnerabilitiesPerSeverity[severity]) totalVulnerabilitiesPerSeverity[severity] = 0;

        // Add the number of severities to our count object
        // so if { critical_30: 7, critical_60: 6, critical_90: 9 }
        // We're extracting "critical" and creating a new property on our object above
        // Then accessing each value from what's passed in and adding it to our total obj
        totalVulnerabilitiesPerSeverity[severity] += severityCountObj[severityIntervals[i]];
    }

    return totalVulnerabilitiesPerSeverity;
}

function ParseSeverityDict(severityDict) {
    const keys = Object.keys(severityDict);
    const regionSeverityCountDict = {};

    for (let i = 0; i < keys.length; i++) {
        // Get the index in the key of the first delimiter
        // EX rh_exp_vul_dis
        //      ^
        const firstDelimiter = keys[i].indexOf('_');

        // The value from the beginning of the string to the first delimiter is our region
        const region = keys[i].substring(0, firstDelimiter);

        // Get the next three characters after that first delimiter, that's our severity type
        const severityType = keys[i].substring(firstDelimiter+1, firstDelimiter+4);

        // Get back an object with the counts of each severity type
        // Ex critical: 13, severe: 7, moderate: 11
        const severityCounts = extractSeverityCounts30to90(severityDict[keys[i]]);

        // If we don't have an entry for this region yet create it in our dict
        if(!regionSeverityCountDict[region]) regionSeverityCountDict[region] = {};
        // Then add an object to that region object with the severity type and its counts
        // rh: {
        //     all: { critical: 13, severe: 16, moderate: 11 },
        //     exp: { critical: 15, severe: 9, moderate: 11 }
        // },
        regionSeverityCountDict[region][severityType] = severityCounts;
    }

    return regionSeverityCountDict;
}

export { ParseSeverityDict }