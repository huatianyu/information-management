import Entity from '../entity'
export default class CtsimOrder {
    isFixed: Number;
    fixedPosition: String;
    bodyPosition: Number;
    requirements: String;
    fixedEquipment: String;
    remarks: String;
    planningSystem: Number ;
    scanningPurpose: String;
    scanningEquipment: Number;
    scanningLocation: Number;
    scanningRange: String;
    scanningMode: Number;
    scanningLayerThickness: Number;
    scanningProcess: Number;
    iodineAllergyTest: Number;
    otherRequirements: String;
    locationId: Number = 0;
    id: Number = 0;

}