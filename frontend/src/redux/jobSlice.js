const jobSlice = createSlice({
    name:"job",
    initialState:{
        allJobs:[],
        allAdminJobs:[],
        singleJob:null, 
        searchJobByText:"",
        allAppliedJobs:[],
        searchedQuery:"",
        companyFilter:"",   // new
        jobTypeFilter:""    // new
    },
    reducers:{
        setAllJobs:(state,action) => { state.allJobs = action.payload; },
        setSingleJob:(state,action) => { state.singleJob = action.payload; },
        setAllAdminJobs:(state,action) => { state.allAdminJobs = action.payload; },
        setSearchJobByText:(state,action) => { state.searchJobByText = action.payload; },
        setAllAppliedJobs:(state,action) => { state.allAppliedJobs = action.payload; },
        setSearchedQuery:(state,action) => { state.searchedQuery = action.payload; },
        setCompanyFilter:(state, action) => { state.companyFilter = action.payload; },   // ✅ define
        setJobTypeFilter:(state, action) => { state.jobTypeFilter = action.payload; }    // ✅ define
    }
});

export const {
    setAllJobs,
    setSingleJob,
    setAllAdminJobs,
    setSearchJobByText,
    setAllAppliedJobs,
    setSearchedQuery,
    setCompanyFilter,
    setJobTypeFilter
} = jobSlice.actions;

export default jobSlice.reducer;
