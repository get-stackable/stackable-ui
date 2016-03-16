FileInput = class FileInput extends React.Component {
    static defaultProps = {
        file: null,
        isRequired: false,
        validations: {}
    };

    static propTypes = {
        onUpload: React.PropTypes.func,
        file: React.PropTypes.string,
        isRequired: React.PropTypes.bool,
        validations: React.PropTypes.object
    };

    constructor(props) {
        super(props);

        this.state = {
            progress: 0,
            isLoading: false,
            file: props.file
        };
    }

    uploadFile = (event) => {
        var metaContext = {type: 'userUpload'};
        var uploader = new Slingshot.Upload("imageUploads", metaContext);
        var file = event.target.files[0];
        this.setState({isLoading: true}); //show loading

        //progress bar
        var computation = Tracker.autorun(() => {
            var progress = Math.ceil(uploader.progress() * 100);
            if (progress === parseInt(progress, 10)) {
                this.setState({progress: progress});
            }
        });

        async.series([
                (callback) => {
                    //upload file
                    uploader.send(file, (error, downloadUrl) => {
                        if (error) {
                            // Log service detailed response.
                            console.error('Error uploading', uploader.xhr.response);
                            console.log(error);
                            FlashMessages.sendError(error.message);

                            callback(error, false);
                        } else {
                            //console.log(downloadUrl);
                            //callback(error, {size: file.size, type: file.type, pathOriginal: downloadUrl});
                            callback(error, downloadUrl);
                        }
                    });
                }
            ],
            (err, results) => {
                //console.log(err, results);
                this.props.onUpload(err, {
                    url: results[0],
                    size: file.size,
                    type: file.type
                });
                computation.stop(); // Stop the computation in order to save memory.

                this.setState({
                    isLoading: false,
                    file: results[0],
                    progress: 0
                });
            });
    };

    renderProgressBar() {
        let progressStyle = {
            transitionDuration: '300ms',
            width: this.state.progress + '%'
        };
        let progressClass = classNames({
            'ui': true,
            'active': this.state.progress > 0,
            'progress': true,
            'success': this.state.progress === 100,
            'hidden': this.state.progress === 0
        });

        return (
            <div className={progressClass} data-percent={this.state.progress}>
                <div className="bar" style={progressStyle}>
                    <div className="progress">{this.state.progress}</div>
                </div>
                <div className="label">Uploading Files</div>
            </div>
        )
    }

    triggerInput() {
        $(`#fileInput-${this.props.name}`).click();
    }

    render() {
        return (
            <div>
                <Loading active={this.state.isLoading} />
                {this.state.progress !== 0 ? this.renderProgressBar() : ''}
                {!_.isNull(this.state.file) ?
                    <a href={this.state.file} target="_blank">
                        <img src={this.state.file} style={{'width':'80px','height':'auto','display':'block'}}/>
                    </a>
                    :''}
                <button className="ui primary button" onClick={this.triggerInput}  style={{'margin': '10px 0'}}>
                    <i className="upload icon"></i> Upload Image
                </button>
                <input
                    ref="file"
                    type="file"
                    name="file"
                    id={`fileInput-${this.props.name}`}
                    onChange={this.uploadFile}
                    style={{'display': 'none'}} />
            </div>
        )
    }
};
