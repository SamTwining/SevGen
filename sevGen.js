const regions = ['emea', 'nortam', 'apac', 'latam', 'japan', 'bermuda', 'rh', 'ext'];
const sev_types = ['all', 'exp'];
const severities = ['critical', 'severe', 'moderate'];
const daysOut = [0, 30, 60, 90];

export function GetDict() {
    const fullDict = {};
    for (let i = 0; i < regions.length; i++) {
        for (let j = 0; j < sev_types.length; j++) {
            const key = `${regions[i]}_${sev_types[j]}_vuln_dis`;
            if(!fullDict[key]) fullDict[key] = {};
            for (let k = 0; k < severities.length; k++) {
                for (let l = 0; l < daysOut.length; l++) {
                    fullDict[key][`${severities[k]}_${daysOut[l]}`] = Math.floor(Math.random() * 10);
                }
            }
        }
    }
    return fullDict;
}
