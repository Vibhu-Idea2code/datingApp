import { useUserDispatch, loginUser } from "../../../context/UserContext";
import { useForm } from "react-hook-form"

// import { adminLogin } from "../../../ApiServices";
import { useNavigate } from "react-router-dom";


function  AuthLogin ()  {

  let navigate = useNavigate();
   // global
   var userDispatch = useUserDispatch();
   
   // local
  var [isLoading, setIsLoading] = useState(false);
  var [error, setError] = useState("");
  const { register, handleSubmit } = useForm();
  const [showPassword, setShowPassword] = React.useState(false);



const handleClickShowPassword = () => setShowPassword((show) => !show);

const onSubmit = async (data) => {
  loginUser(userDispatch, data, navigate, setIsLoading, setError);
};


return (

<form onSubmit={handleSubmit(onSubmit)}>
<Typography variant="h4" align="center">Welcome to Fitness Admin</Typography>
  <Fade in={error} mb={2}>
    <Typography color="#FF0000"  >
      {error ? error : ""}
    </Typography>
  </Fade>
  <TextField
    id="email"
    {...register("email", { required: true })}
    margin="normal"
    placeholder="Email Id"
    type="email"
    label="Email Id" 
    fullWidth
  />
  <FormControl  sx={{ mt: 2 }} variant="outlined" fullWidth>
    <InputLabel htmlFor="outlined-adornment-password" >Password</InputLabel>
    <OutlinedInput fullWidth id="password"
      {...register("password", { required: true })}
      placeholder="Password"
      label="Password"
      type={showPassword ? 'text' : 'password'}
      endAdornment={
        <InputAdornment position="end">
          <IconButton
            aria-label="toggle password visibility"
            onClick={handleClickShowPassword}
            edge="end"
          >
            {showPassword ? <VisibilityOff /> : <Visibility />}
          </IconButton>
        </InputAdornment>
      }
    />
  </FormControl>
  <Grid item xs={12} mt={2}>
    <Box display="flex" justifyContent="flex-end">
        <Typography
          variant="body2"
          gutterBottom
          component={Link}
          // align="right"
          href="/forgot-password"
        > Forget Password?
        </Typography>
    </Box>
  </Grid>
 
  
  <div>
  {isLoading ? (
                    <Grid item xs={12} mt={2} style={{'text-align':'center'}}>
                    <CircularProgress
                      size={26}
                      fullWidth
                    /></Grid>
                  ) : (
                    <Button
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          fullWidth> 
          Login
      </Button>
                  )}

      
  </div>           
</form>
);
}

export default AuthLogin;