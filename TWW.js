const _valorstones = function(){
    let upgrades = {
     558: [50,25,40,25,50,25,40,40,50,40,25,40,0,0],	561: [50,25,40,25,50,25,40,40,50,40,25,40,0,0],	564: [50,25,40,25,50,25,40,40,50,40,25,40,0,0],	567: [75,40,65,40,75,40,65,65,75,65,40,65,0,0],	571: [75,40,65,40,75,40,65,65,75,65,40,65,0,0],	574: [75,40,65,40,75,40,65,65,75,65,40,65,0,0],	577: [75,40,65,40,75,40,65,65,75,65,40,65,0,0],	580: [120,65,100,65,120,65,100,100,120,100,65,100,0,0],	584: [120,65,100,65,120,65,100,100,120,100,65,100,0,0],	587: [120,65,100,65,120,65,100,100,120,100,65,100,0,0],	590: [120,65,100,65,120,65,100,100,120,100,65,100,0,0],	593: [145,0,120,0,145,0,0,0,0,0,0,120,0,0],	597: [145,0,120,0,145,0,0,0,0,0,0,120,0,0],	600: [145,0,120,0,145,0,0,0,0,0,0,120,0,0],	603: [145,0,120,0,145,0,0,0,0,0,0,120,0,0],
    }

    let upgradeLevels = [558,561,564,567,571,574,577,580,584,587,590,593,597,600,603,606];
    let slotNames = ["Head","Neck","Shoulders","Back","Chest","Wrists","Hands","Waist","Legs","Boots","Ring","Trinket","Weapon 1","Weapon 2"];

    let upgradeBands = {
        "Explorer": {min: 558, max: 580},
        "Adventurer": {min: 571, max: 593},
        "Veteran": {min: 584, max: 606},
    }
    
    function calculateUpgradeCost(slot, start, end){
        let band = start.split(" ")[0];
        let bandEnd = end.split(" ")[0];
        // slot = slot.split(" ")[0];

        if(band != bandEnd){
            return {
                error: "Cannot upgrade between upgrade types"
            }
        }

        let startUpgLevel = parseInt(start.split(" ")[1]);
        let endUpgLevel = parseInt(end.split(" ")[1]);

        if(startUpgLevel == endUpgLevel){
            return {
                error: "Upgrade level start and end is the same"
            }
        }
        else if(endUpgLevel < startUpgLevel){
            return {
                error: "Selected options would be a downgrade"
            }
        }
        // console.log(band, startUpgLevel, endUpgLevel);

        let startIlvl = calculateBandItemLevel(band, startUpgLevel);
        let endIlvl = calculateBandItemLevel(band, endUpgLevel);
        let numSteps = bandsBetween(startIlvl, endIlvl);

        // console.log(startIlvl, endIlvl, numSteps);

        let stepsRequired = upgradeLevels.slice(upgradeLevels.indexOf(startIlvl),upgradeLevels.indexOf(endIlvl));
        // console.log(stepsRequired)

        let total = 0;

        let stepErrors = [];

        stepsRequired.forEach(step => {
            total += upgrades[step][slot];
            // console.log(upgrades[step][slot],slot);
            if(upgrades[step][slot] == 0){
                stepErrors.push({
                    error: `Missing data for ${step}`
                });
            }
        });

        if(stepErrors.length){
            return stepErrors[0];
        }

        // console.log(total);

        // console.log(`Upgrading ${slotNames[slot]} from ${band} ${startUpgLevel}/8 to ${band} ${endUpgLevel}/8 will require ${total} valorstones`);
        return total;
    }

    function bandsBetween(start, end){
        let startIndex = upgradeLevels.indexOf(start);
        let endIndex = upgradeLevels.indexOf(end);

        return endIndex - startIndex;
    }

    function calculateBandItemLevel(band, level){
        let bandMin = upgradeBands[band].min;
        let uIdx = upgradeLevels.indexOf(bandMin);

        let targetIndex = uIdx + (level-1);
        return upgradeLevels[targetIndex];
    }

    // console.log(calculateUpgradeCost(1,"Veteran 1","Veteran 8"));

    let displayedSlots = ["Head","Neck","Shoulders","Back","Chest","Wrists","Hands","Waist","Legs","Boots","Ring 1","Ring 2","Trinket 1","Trinket 2","Weapon 1","Weapon 2"];

    let selectOptions = `
        <option value="Explorer 1">Explorer 1/8</option>
        <option value="Explorer 2">Explorer 2/8</option>
        <option value="Explorer 3">Explorer 3/8</option>
        <option value="Explorer 4">Explorer 4/8</option>
        <option value="Explorer 5">Explorer 5/8</option>
        <option value="Explorer 6">Explorer 6/8</option>
        <option value="Explorer 7">Explorer 7/8</option>
        <option value="Explorer 8">Explorer 8/8</option>

        <option value="Adventurer 1">Adventurer 1/8</option>
        <option value="Adventurer 2">Adventurer 2/8</option>
        <option value="Adventurer 3">Adventurer 3/8</option>
        <option value="Adventurer 4">Adventurer 4/8</option>
        <option value="Adventurer 5">Adventurer 5/8</option>
        <option value="Adventurer 6">Adventurer 6/8</option>
        <option value="Adventurer 7">Adventurer 7/8</option>
        <option value="Adventurer 8">Adventurer 8/8</option>

        <option value="Veteran 1">Veteran 1/8</option>
        <option value="Veteran 2">Veteran 2/8</option>
        <option value="Veteran 3">Veteran 3/8</option>
        <option value="Veteran 4">Veteran 4/8</option>
        <option value="Veteran 5">Veteran 5/8</option>
        <option value="Veteran 6">Veteran 6/8</option>
        <option value="Veteran 7">Veteran 7/8</option>
        <option value="Veteran 8">Veteran 8/8</option>
    `;

    

    document.getElementById('content').innerHTML = `
    <table style="width: 100%; display: block;" id="table">
    <tr>
        <th>Equip Slot</th>
        <th>Current</th>
        <th>Goal</th>
        <th></th>
    </tr>
    ${displayedSlots.map(slot => {
        return `
            <tr>
                <td>
                    ${slot}
                </td>
                <td>
                    <select id="start_${slot}">${selectOptions}</select>
                </td>
                <td>
                    <select id="end_${slot}">${selectOptions}</select>
                </td>
                <td id="error_${slot}"></td>
            </tr>
        `
    }).join("")}
        <tr style="text-align: left;">
            <th>Total</th><th></th><th></th><th id="total"></th>
        </tr>
        <tr style="text-align: left;">
            <th>New ilvl (inc. errors)</th><th></th><th></th><th id="ilvl"></th>
        </tr>
    </table>
    <input type="button" value="Calculate" id="calc">`;

    document.getElementById('calc').onclick = function(){
        calcAll(); 
    }

    let previousData = localStorage.getItem("previousSlotData");
    if(previousData){
        previousData = JSON.parse(previousData);

        let t = document.getElementById('table');
        let selects = t.getElementsByTagName('select');

        previousData.forEach((item,idx) => {
            // console.log(item);

            selects[2*idx].value = item.start;
            selects[2*idx + 1].value = item.end;
        });
    }

    function calcAll(){
        let saveData = [];

        let total = 0;
        let totalilvl = 0;
        displayedSlots.forEach(slot => {
            let start = document.getElementById(`start_${slot}`).value;
            let end = document.getElementById(`end_${slot}`).value;

            saveData.push({
                start: start,
                end: end
            })

            let slotIdx = slot.split(" ")[0]=="Weapon"?slotNames.indexOf(slot):slotNames.indexOf(slot.split(" ")[0]);
            let result = calculateUpgradeCost(slotIdx, start, end);
            let ilvlstart = calculateBandItemLevel(start.split(" ")[0], start.split(" ")[1]);
            let ilvlend = calculateBandItemLevel(end.split(" ")[0], end.split(" ")[1]);
            let ilvlgain = ilvlend - ilvlstart;
            // console.log(result);
            if(result && result.error){
                document.getElementById(`error_${slot}`).innerHTML = result.error;
            }
            else{
                total += result;

                document.getElementById(`error_${slot}`).innerHTML = `${result} - ${(result/ilvlgain).toFixed(1)} valorstones per item level `;
            }

            totalilvl += ilvlend;
        });


        localStorage.setItem("previousSlotData",JSON.stringify(saveData));
        console.log(total);

        document.getElementById('total').innerHTML = total;
        document.getElementById('ilvl').innerHTML = totalilvl/16;
    }

    calcAll();

    return {
        calcAll
    }
}();
