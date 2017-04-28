var Base = new (require('./BaseModel'))();

module.exports = {
    table : "[Abc].[tablexyz]",
    tableBodyPartDisease : "[Abc].[pqr]",
    tableDiseaseSymptom : "[anat].[mno]",
    getList : function(params, callback) {
        var id = typeof params.id != 'undefined' ? params.id : 0;
        
        var where = "WHERE IsVisible=1";
        if (params) {
            if (id)
                where += " AND BodyPartId in (" + params.id + ")";
        }
        
//        if (where != "") {
//            where = " WHERE " + this.util.ltrim(where, " AND ");
//        }
        
        var select = "BodyPartId, Name, DisplayName, IconImage, IconImageCdnPath, Description, Type, HashTag";
        //var query = "SELECT " + select + " FROM " + this.table;
        var query = "SELECT * FROM " + this.table + where;
        
        this.db.request().query(query, function(err, recordset) {
            if (err) {
                callback({error : err});
            }
            else {
                callback(false, recordset);
            }
        });
    },
    getBodyPart: function ( params, callback) {
        var catId = typeof params.id !== 'undefined' ? params.id : 0;
        var dbreq = this.db.request();
        /*var query = "SELECT BPC.*,BP.BodyPartName ";
            query += "FROM Anatomy.tblBodyPartCategory as BPC ";
            query += "INNER JOIN Anatomy.tblBodyPart as BP ON BP.BodyPartId = BPC.BodyPartId ";
            query += "WHERE BPC.HumanAnatomyCategoryId = "+catId;*/
        dbreq.input('pCategoryId', catId);
        dbreq.execute("[anat].[gbp]", function (err, recordset) {
       // this.db.request().query(query, function(err, recordset) {
            if (err) {
              callback({error : err});
            }
            else {
                callback(false, recordset);
            }
        });   
    },
    getbodyPartDtls: function (bodyPartId, callback) {
        var query = "SELECT BodyPartId,IsMale,IsFemale,MaleWidgetId,FemaleWidgetId ";
        query += " FROM [anat].[BodyPart]";
        query += " WHERE BodyPartId = " + bodyPartId;

        this.db.request().query(query, function (err, recordset) {
            if (err) {
                callback({error: err});
            }
            else {
                callback(false, recordset);
            }
        });  
    },
    getSymptoms: function (bodyPartId, params, callback) {
        var query = "SELECT [s].[DisplayName], [s].[Description], [ds].[HashTag] AS DiseaseSymptomHasTag, [bpd].[HashTag] AS BodyPartDiseaseHashTag";
        query += " FROM [anat].[BodyPartDisease] AS bpd";
        query += " INNER JOIN [anat].[DiseaseSymptom] AS ds ON ds.DiseaseId=bpd.DiseaseId";
        query += " INNER JOIN [anat].[Symptom] AS s ON s.SymptomId = ds.SymptomId AND s.IsVisible=1";
        query += " WHERE bpd.BodyPartId = " + bodyPartId;

        this.db.request().query(query, function (err, recordset) {
            if (err) {
                callback({error: err});
            }
            else {
                callback(false, recordset);
            }
        });
    }
};



//SELECT DISTINCT 
//s.SymptomName  
//FROM [anat].[BodyPartDisease] AS bp 
//INNER JOIN [anat].[BodyPartDisease] AS bpd ON bpd.BodyPartId=bp.BodyPartId AND bpd.BodyPartId = 3 
//INNER JOIN [anat].[DiseaseSymptom] AS ds ON ds.DiseaseId=bpd.DiseaseId 
//INNER JOIN [anat].[Symptom] AS s ON s.SymptomId = ds.SymptomId 
//
//SELECT DISTINCT 
//s.SymptomName  
//FROM [anat].[BodyPartDisease] AS bpd 
//INNER JOIN [anat].[DiseaseSymptom] AS ds ON ds.DiseaseId=bpd.DiseaseId 
//INNER JOIN [anat].[Symptom] AS s ON s.SymptomId = ds.SymptomId 
//WHERE bpd.BodyPartId = 2
