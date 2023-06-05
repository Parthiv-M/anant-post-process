import joblib
import sys, json
import pandas as pd
import numpy as np

def loadPKLFile(file_name):
    """
    Function to load the .pkl file and return the unpacked object
    ...
    Parameters
    ----------
    file_name : str
        The name (or file path) of the .pkl file to be loaded
    """
    # open the file in binary mode
    pickle_file = open(file_name, 'rb')
    loaded_file = joblib.load(pickle_file)
    pickle_file.close()
    return loaded_file
    
def initScript(arg_arr):
    """
    Function to use the scaler and the model in succession to 
    run the model based on user inputs received from the
    NodeJS environment 
    ...
    Parameters
    ----------
    arg_arr : str[]
        The argument array received from sys.argv when the 
        python script was spawned as a child process
    """
    user_input = json.loads(arg_arr[1])
    scaler_path = arg_arr[3]
    model_path = arg_arr[2]
    features_of_model = json.loads(arg_arr[4])

    user_input_values = [ float(val) for val in user_input.values() ]
    user_input_array = np.array(user_input_values)
    user_input_array = user_input_array.reshape(1, -1)

    # load and run the standard scaler
    pkl_scaler = loadPKLFile(scaler_path)
    try:
        scaled_values = pkl_scaler.transform(user_input_array)
    except ValueError as val_error:
        print(str(val_error))
        sys.stdout.flush()
        sys.exit(-1)

    # create a dictionary with model input labels and scaled input values
    model_input_dict = {}
    for idx, feature in enumerate(features_of_model):
        if (feature['requiredForModel']):
            model_input_dict[feature['featureName']] = scaled_values[0][idx]
        else:
            pass

    transform_dict = { key : [float(value)] for key, value in model_input_dict.items() }
    model_input_df = pd.DataFrame(transform_dict)

    # load and run the ML model
    pkl_model = loadPKLFile(model_path)
    model_output = pkl_model.predict(model_input_df)

    print(model_output)
    sys.stdout.flush()
    return 0

if __name__ == "__main__":
    initScript(sys.argv)
