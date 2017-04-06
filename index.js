
const intel = require('intel');
const Handler = intel.Handler;
const SysLogger = require('syslogger');
  

const fromIntelToSyslogger = {
    'NOTSET': 'debug',
    'TRACE' : 'debug',
    'VERBOSE': 'debug',
    'DEBUG': 'debug',
    'INFO': 'info',
    'WARN': 'warn',
    'ERROR': 'err',
    'CRITICAL': 'crit'
}

export class SyslogHandler extends Handler {



    constructor(options) {
        this.syslog = new SysLogger({
            name: options.name,
            address: options.address,
            port: options.port,
            facility: options.facility,
            type: 'RFC3164'
        });

        super(options);

    }

    emit(record) {
        const severity = fromIntelToSyslogger[record.level]
        this.syslog.log(fromIntelToSyslogger[record.level],
                        this.format(record));
    }
}
